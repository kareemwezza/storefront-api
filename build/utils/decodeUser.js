"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req) => {
    const token = req.get("Authorization")?.split(" ")[1];
    const user = jsonwebtoken_1.default.decode(token);
    return user;
};
