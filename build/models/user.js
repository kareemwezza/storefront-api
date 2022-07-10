"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const database_1 = __importDefault(require("../database"));
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
class UserModel {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT id, first_name, last_name, email FROM Users";
            const response = await connection.query(sql);
            connection.release();
            return response.rows;
        }
        catch (error) {
            throw new Error("Database error connection encountered. Please try again later.😴");
        }
    }
    async show(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT id, first_name, last_name, email FROM Users WHERE id=($1)";
            const response = await connection.query(sql, [id]);
            connection.release();
            return response.rows[0];
        }
        catch (error) {
            throw new Error("Database error connection encountered. Please try again later.😴");
        }
    }
    async create(user) {
        try {
            const connection = await database_1.default.connect();
            const password = (0, hashPassword_1.default)(user.password);
            const sql = `INSERT INTO Users (email,password, first_name, last_name)
         VALUES ($1, $2, $3, $4)
         RETURNING id, email, first_name, last_name`;
            const response = await connection.query(sql, [
                user.email,
                password,
                user.first_name,
                user.last_name,
            ]);
            connection.release();
            return response.rows[0];
        }
        catch (error) {
            throw new Error("Database error connection encountered. Please try again later.😴");
        }
    }
    async authanticate(email, password) {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM Users WHERE email=$1";
            const response = await connection.query(sql, [email]);
            connection.release();
            if (response.rows.length) {
                const { password: hashedPassword, ...user } = response.rows[0];
                const isValid = bcrypt_1.default.compareSync(`${password}${config_1.default.hash}`, hashedPassword);
                if (isValid) {
                    return user;
                }
            }
            return null;
        }
        catch (error) {
            console.log(error);
            throw new Error("Database error connection encountered. Please try again later.😴");
        }
    }
}
exports.default = UserModel;
