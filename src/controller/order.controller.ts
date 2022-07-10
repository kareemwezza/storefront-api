import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

import OrderModel from "../models/order";
import { orderStatus } from "../types";
import decodeUser from "../utils/decodeUser";

const orderModel = new OrderModel();

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = decodeUser(req);
    const order = await orderModel.createOrder(user.id as number, "active");
    res.status(201).json({
      status: 201,
      data: { ...order },
      message: "Order Has been created successfully 😎.",
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = req.query.status as unknown as orderStatus;
  try {
    const user = decodeUser(req);
    const orders = await orderModel.getCurrentOrders(user.id as number, status);
    res.status(200).json({
      status: 200,
      data: orders,
      message: "Current Orders Have been retrieved successfully 😎.",
    });
  } catch (error) {
    next(error);
  }
};
