import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { CustomeError } from "../middlewares/errorHandler";
import UserModel from "../models/user";

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    return res.status(201).json({
      status: 201,
      data: { ...user },
      message: "User Created Successfully 😎.",
    });
  } catch (error) {
    next(error);
  }
};

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.index();
    return res.status(200).json({
      status: 200,
      data: users,
      message: "All Users Have been retrieved successfully 😋",
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id as unknown as number;
    const user = await userModel.show(userId);
    return res.status(200).json({
      status: 200,
      data: { ...user },
      message: "User Has been retrieved successfully 😋",
    });
  } catch (error) {
    next(error);
  }
};

export const authanticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authanticate(email, password);
    if (!user) {
      throw new CustomeError(
        "Authentication failed! Email or Password may be wrong try again later 😪",
        401
      );
    }
    const token = jwt.sign(user, config.tokenSecret as string);
    res.status(200).json({
      status: 200,
      token,
      message: "User has been authenticated successfully.",
    });
  } catch (error) {
    next(error);
  }
};
