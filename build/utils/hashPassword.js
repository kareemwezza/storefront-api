"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
exports.default = (password) => {
    const salt = parseInt(config_1.default.salt);
    const hashedPassword = bcrypt_1.default.hashSync(`${password}${config_1.default.hash}`, salt);
    return hashedPassword;
};
