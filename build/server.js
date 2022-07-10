"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config"));
console.log(process.env.NODE_ENV);
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const PORT = config_1.default.port || 3000;
const app = (0, express_1.default)();
const address = `http://localhost:${PORT}`;
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("short"));
app.get("/", function (_req, res) {
    res.send("Hello World!");
});
app.use("/api/v1", routes_1.default);
// Error 404
app.use((_req, res) => {
    res.status(404).json({
        status: 404,
        message: "Are You Lost? Please make sure you are looking for the right place 😎",
    });
});
app.use(errorHandler_1.default);
app.listen(PORT, function () {
    console.log(`starting app on: ${address}`);
});
