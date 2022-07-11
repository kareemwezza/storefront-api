import supertest from "supertest";
import UserModel from "../../models/user";

import app from "../../server";
import { User } from "../../types";
import db from "../../database";

let token: string;

const request = supertest(app);

const userModel = new UserModel();

describe("/users api endpoint testing", () => {
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
    const sql = "DELETE FROM Users;";
    await connection.query(sql);
    connection.release();
  });

  it("getting all users from /users endpoint", async () => {
    const response = await request
      .get("/api/v1/users")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("getting single user from /users/:id endpoint", async () => {
    const response = await request
      .get(`/api/v1/users/${user.id}`)
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("Create new user on /users endpoint", async () => {
    const user2: User = {
      first_name: "Test2",
      last_name: "Last",
      email: "test@testa.com",
      password: "123456",
    };
    const response = await request.post("/api/v1/users").send(user2);
    expect(response.status).toBe(201);
  });

  it("Authenticate Users at /users/authenticate endpoint", async () => {
    const response = await request
      .post("/api/v1/users/authenticate")
      .send({ email: user.email, password: user.password });
    expect(response.status).toBe(200);
  });
});
