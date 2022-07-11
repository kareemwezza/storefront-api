"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const order_1 = __importDefault(require("../../models/order"));
const user_1 = __importDefault(require("../user"));
const orderModel = new order_1.default();
const userModel = new user_1.default();
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
        const user = {
            first_name: "Kareem",
            last_name: "Fouad",
            email: "kareemfouad@gmail.com",
            password: "123456",
        };
        let order;
        beforeAll(async () => {
            const createdUser = await userModel.create(user);
            order = await orderModel.createOrder(createdUser.id, "active");
            user.id = createdUser.id;
        });
        afterAll(async () => {
            const connection = await database_1.default.connect();
            const sql = `DELETE FROM Orders;
      DELETE FROM Users;
      ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
            await connection.query(sql);
            connection.release();
        });
        it("Create new order to the database", async () => {
            order = await orderModel.createOrder(user.id, "active");
            expect(order).toEqual({
                status: "active",
                id: order.id,
                user_id: user.id,
            });
        });
        it("get Order status for users from database", async () => {
            const orders = await orderModel.getCurrentOrders(user.id, "active");
            expect(orders).toContain(order);
        });
    });
});
