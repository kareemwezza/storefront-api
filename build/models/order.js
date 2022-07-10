"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class OrdersModel {
    async getCurrentOrders(userId, status) {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * from Orders WHERE id=($1) AND status=($2)";
            const response = await connection.query(sql, [userId, status]);
            connection.release();
            return response.rows;
        }
        catch (error) {
            console.log(error);
            throw new Error("Database error connection encountered. Please try again later.😴");
        }
    }
    async createOrder(userId, status) {
        try {
            const connection = await database_1.default.connect();
            const sql = `INSERT INTO Orders
      (user_id, status) VALUES ($1, $2) RETURNING *`;
            const response = await connection.query(sql, [userId, status]);
            connection.release();
            return response.rows[0];
        }
        catch (error) {
            console.log(error);
            throw new Error("Database error connection encountered. Please try again later.😴");
        }
    }
    async addProduct(productId, quan) {
        try {
            const connection = await database_1.default.connect();
            const sql = `INSERT INTO Orders_Products 
    (product_id, quantity, order_id) VALUES
    ($1, $2, $3)`;
            const response = await connection.query(sql);
            connection.release();
        }
        catch (error) {
            throw new Error("Database error connection encountered. Please try again later.😴");
        }
    }
}
exports.default = OrdersModel;
