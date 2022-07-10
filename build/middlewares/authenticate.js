"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const errorHandler_1 = require("./errorHandler");
exports.default = (req, res, next) => {
    try {
        const auth = req.get("Authorization");
        const bearer = auth?.split(" ")[0].toLocaleLowerCase();
        const token = auth?.split(" ")[1];
        if (token && bearer === "bearer") {
            const decode = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
            if (decode) {
                next();
            }
            else {
                throw new errorHandler_1.CustomeError("You are not authorized", 401);
            }
        }
        else {
            throw new errorHandler_1.CustomeError("You are not authorized", 401);
        }
    }
    catch (error) {
        let err = error;
        if (!(error instanceof errorHandler_1.CustomeError)) {
            err = new errorHandler_1.CustomeError("You are not authorized", 401);
        }
        next(err);
    }
};
