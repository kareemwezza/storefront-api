import supertest from "supertest";
import UserModel from "../../models/user";

import app from "../../server";
import { Product, User } from "../../types";
import db from "../../database";
import ProductModel from "../../models/product";
let token: string;

const request = supertest(app);

const userModel = new UserModel();
const productModel = new ProductModel();

describe("/Product api endpoint testing", () => {
  const user: User = {
    first_name: "Test1",
    last_name: "Last",
    email: "test@test.com",
    password: "123456",
  };

  const product: Product = {
    name: "Test Product2",
    price: 200,
    category: "Test",
  };

  beforeAll(async () => {
    const createdUser = await userModel.create(user);
    const createdProduct = await productModel.create(product);
    product.id = createdProduct.id;
    user.id = createdUser.id;
    const response = await request
      .post("/api/v1/users/authenticate")
      .send({ email: user.email, password: user.password });
    token = response.body.token;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql = `DELETE FROM Users;
    DELETE FROM Products;`;
    await connection.query(sql);
    connection.release();
  });

  it("getting all products from /products endpoint", async () => {
    const response = await request
      .get("/api/v1/products")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("create new product to /products api", async () => {
    const response = await request
      .post("/api/v1/products")
      .send({ name: "Product test 1", price: 100, category: "test" })
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(201);
  });

  it("get single product by id from /products/:id endpoint", async () => {
    const response = await request.get(`/api/v1/products/${product.id}`);
    expect(response.status).toBe(200);
  });

  it("get single product by category from /products/category endpoint", async () => {
    const response = await request.post("/api/v1/products/category").send({
      category: product.category,
    });
    expect(response.status).toBe(200);
  });
});
