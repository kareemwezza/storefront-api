"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
});
