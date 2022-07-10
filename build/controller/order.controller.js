"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrent = exports.createOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
const decodeUser_1 = __importDefault(require("../utils/decodeUser"));
const orderModel = new order_1.default();
const createOrder = async (req, res, next) => {
    try {
        const user = (0, decodeUser_1.default)(req);
        const order = await orderModel.createOrder(user.id, "active");
        res.status(201).json({
            status: 201,
            data: { ...order },
            message: "Order Has been created successfully 😎.",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createOrder = createOrder;
const getCurrent = async (req, res, next) => {
    const status = req.query.status;
    try {
        const user = (0, decodeUser_1.default)(req);
        const orders = await orderModel.getCurrentOrders(user.id, status);
        res.status(201).json({
            status: 201,
            data: orders,
            message: "Current Orders Have been retrieved successfully 😎.",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCurrent = getCurrent;
