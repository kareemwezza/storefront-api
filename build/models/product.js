"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ProductModel {
    async create(product) {
        try {
            const connection = await database_1.default.connect();
            const sql = `INSERT INTO Products
     (name, price, category)
     VALUES($1, $2, $3) RETURNING *`;
            const response = await connection.query(sql, [
                product.name,
                product.price,
                product.category,
            ]);
            connection.release();
            return response.rows[0];
        }
        catch (error) {
            throw new Error("Database error connection encountered. Please try again later.😴");
        }
    }
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM Products";
            const response = await connection.query(sql);
            connection.release();
            return response.rows;
        }
        catch (error) {
            throw new Error("Database error connection encountered. Please try again later.😴");
        }
    }
    async getOne(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM Products WHERE id=($1)";
            const response = await connection.query(sql, [id]);
            connection.release();
            return response.rows[0];
        }
        catch (error) {
            throw new Error("Database error connection encountered. Please try again later.😴");
        }
    }
    async getByCategory(category) {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM Products WHERE category=($1)";
            const response = await connection.query(sql, [category]);
            connection.release();
            return response.rows;
        }
        catch (error) {
            throw new Error("Database error connection encountered. Please try again later.😴");
        }
    }
}
exports.default = ProductModel;
