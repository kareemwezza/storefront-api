import db from "../../database";
import OrderModel from "../../models/order";
import { Order, User } from "../../types";
import UserModel from "../user";

const orderModel = new OrderModel();
const userModel = new UserModel();

describe("Order Model", () => {
  describe("Check Orders model existence", () => {
    it("should have a create order method", () => {
      expect(orderModel.createOrder).toBeDefined();
    });

    it("should have get orders for user method", () => {
      expect(orderModel.getCurrentOrders).toBeDefined();
    });
  });

  describe("Check Orders Methods functioality on DB", () => {
    const user: User = {
      first_name: "Kareem",
      last_name: "Fouad",
      email: "kareemfouad@gmail.com",
      password: "123456",
    };
    let order: Order;
    beforeAll(async () => {
      const createdUser = await userModel.create(user);
      order = await orderModel.createOrder(createdUser.id as number, "active");
      user.id = createdUser.id;
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql = `DELETE FROM Orders;
      DELETE FROM Users;
      ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
      await connection.query(sql);
      connection.release();
    });

    it("Create new order to the database", async () => {
      order = await orderModel.createOrder(user.id as number, "active");
      expect(order).toEqual({
        status: "active",
        id: order.id,
        user_id: user.id as number,
      });
    });

    it("get Order status for users from database", async () => {
      const orders = await orderModel.getCurrentOrders(
        user.id as number,
        "active"
      );
      expect(orders).toContain(order);
    });
  });
});
