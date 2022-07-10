import db from "../database";
import { Product } from "../types";

export default class ProductModel {
  async create(product: Product): Promise<Product> {
    try {
      const connection = await db.connect();
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
    } catch (error) {
      throw new Error(
        "Database error connection encountered. Please try again later.😴"
      );
    }
  }

  async index(): Promise<Product[]> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * FROM Products";
      const response = await connection.query(sql);
      connection.release();
      return response.rows;
    } catch (error) {
      throw new Error(
        "Database error connection encountered. Please try again later.😴"
      );
    }
  }

  async getOne(id: string): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * FROM Products WHERE id=($1)";
      const response = await connection.query(sql, [id]);
      connection.release();
      return response.rows[0];
    } catch (error) {
      throw new Error(
        "Database error connection encountered. Please try again later.😴"
      );
    }
  }

  async getByCategory(category: string) {
    try {
      const connection = await db.connect();
      const sql = "SELECT * FROM Products WHERE category=($1)";
      const response = await connection.query(sql, [category]);
      connection.release();
      return response.rows;
    } catch (error) {
      throw new Error(
        "Database error connection encountered. Please try again later.😴"
      );
    }
  }

  async getPopular() {}
}
