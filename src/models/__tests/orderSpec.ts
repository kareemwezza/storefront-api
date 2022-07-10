import db from "../../database";
import OrderModel from "../../models/order";
import { Order } from "../../types";

const orderModel = new OrderModel();

describe("Order Model", () => {
  describe("Check Orders model existence", () => {
    it("should have a create order method", () => {
      expect(orderModel.createOrder).toBeDefined();
    });

    it("should have get orders for user method", () => {
      expect(orderModel.getCurrentOrders).toBeDefined();
    });
  });
});
