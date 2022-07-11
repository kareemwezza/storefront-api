import supertest from "supertest";
import UserModel from "../../models/user";

import app from "../../server";
import { User } from "../../types";
import db from "../../database";
let token: string;

const request = supertest(app);

const userModel = new UserModel();

describe("/orders api endpoint testing", () => {
  const user: User = {
    first_name: "Test1",
    last_name: "Last",
    email: "test@test.com",
    password: "123456",
  };

  beforeAll(async () => {
    const createdUser = await userModel.create(user);
    user.id = createdUser.id;
    const response = await request
      .post("/api/v1/users/authenticate")
      .send({ email: user.email, password: user.password });
    token = response.body.token;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql = `DELETE FROM Orders;
    DELETE FROM Users;`;
    await connection.query(sql);
    connection.release();
  });

  it("create new order to /orders api", async () => {
    const response = await request
      .post("/api/v1/orders")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(201);
  });
});
