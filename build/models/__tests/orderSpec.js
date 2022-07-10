"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const order_1 = __importDefault(require("../../models/order"));
const orderModel = new order_1.default();
describe("Order Model", () => {
    describe("Check Orders model existence", () => {
        it("should have a create order method", () => {
            expect(orderModel.createOrder).toBeDefined();
        });
        it("should have get orders for user method", () => {
            expect(orderModel.getCurrentOrders).toBeDefined();
        });
    });
    describe("Check Orders methods functionality", () => {
        const order = {
            user_id: 1,
            status: "complete",
        };
        beforeAll(async () => {
            const newOrder = await orderModel.createOrder(order.user_id, order.status);
            order.id = newOrder.id;
        });
        afterAll(async () => {
            const connection = await database_1.default.connect();
            const sql = "DELETE FROM Orders";
            await connection.query(sql);
            connection.release();
        });
        it("create new order with status complete", async () => {
            const ord = await orderModel.createOrder(order.user_id, order.status);
            expect(ord).toEqual(order);
        });
    });
});
