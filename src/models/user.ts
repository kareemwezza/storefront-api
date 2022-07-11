import bcrypt from "bcrypt";
import config from "../config";

import db from "../database";
import { User } from "../types";
import hashPassword from "../utils/hashPassword";

export default class UserModel {
  async index(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql = "SELECT id, first_name, last_name, email FROM Users";
      const response = await connection.query(sql);
      connection.release();
      return response.rows;
    } catch (error) {
      throw new Error(
        "Database error connection encountered. Please try again later.😴"
      );
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connection = await db.connect();
      const sql =
        "SELECT id, first_name, last_name, email FROM Users WHERE id=($1)";
      const response = await connection.query(sql, [id]);
      connection.release();
      return response.rows[0];
    } catch (error) {
      throw new Error(
        "Database error connection encountered. Please try again later.😴"
      );
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connection = await db.connect();
      const password = hashPassword(user.password as string);
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
    } catch (error) {
      throw new Error(
        "Database error connection encountered. Please try again later.😴"
      );
    }
  }

  async authanticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * FROM Users WHERE email=$1";
      const response = await connection.query(sql, [email]);
      connection.release();
      if (response.rows.length) {
        const { password: hashedPassword, ...user } = response.rows[0];
        const isValid = bcrypt.compareSync(
          `${password}${config.hash}`,
          hashedPassword
        );
        if (isValid) {
          return user;
        }
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new Error(
        "Database error connection encountered. Please try again later.😴"
      );
    }
  }
}
