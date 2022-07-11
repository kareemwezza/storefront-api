import db from "../database";
import { Order, orderStatus } from "../types";

export default class OrdersModel {
  async getCurrentOrders(
    userId: number,
    status: orderStatus
  ): Promise<Order[]> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * from Orders WHERE user_id=($1) AND status=($2)";
      const response = await connection.query(sql, [userId, status]);
      connection.release();
      return response.rows;
    } catch (error) {
      console.log(error);
      throw new Error(
        "Database error connection encountered. Please try again later.😴"
      );
    }
  }

  async createOrder(userId: number, status: orderStatus): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO Orders
      (user_id, status) VALUES ($1, $2) RETURNING *`;
      const response = await connection.query(sql, [userId, status]);
      connection.release();
      return response.rows[0];
    } catch (error) {
      console.log(error);

      throw new Error(
        "Database error connection encountered. Please try again later.😴"
      );
    }
  }

  async addProduct(productId: number, quan: number) {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO Orders_Products 
    (product_id, quantity, order_id) VALUES
    ($1, $2, $3)`;
      const response = await connection.query(sql);
      connection.release();
    } catch (error) {
      throw new Error(
        "Database error connection encountered. Please try again later.😴"
      );
    }
  }
}
