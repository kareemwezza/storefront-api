"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config"));
const client = new pg_1.Pool({
    host: config_1.default.host,
    port: parseInt(config_1.default.dbPort),
    database: config_1.default.db,
    user: config_1.default.username,
    password: config_1.default.password,
    max: 4,
});
client.on("error", (err) => {
    console.error("Database error occured", err);
});
exports.default = client;
