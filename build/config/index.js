"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, NODE_ENV, POSTGRES_HOST, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_PORT, POSTGRES_USERNAME, POSTGRES_PASSWORD, PEPPER, SALT_ROUNDS, TOKEN_SECRET, } = process.env;
exports.default = {
    port: PORT,
    host: POSTGRES_HOST,
    db: NODE_ENV === "dev" ? POSTGRES_DB : POSTGRES_DB_TEST,
    dbPort: POSTGRES_PORT,
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    hash: PEPPER,
    salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET,
};
