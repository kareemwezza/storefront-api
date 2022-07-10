import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/product";

const productModel = new ProductModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json({
      status: 201,
      data: { ...product },
      message: "Product has been created successfully 😋.",
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
    const products = await productModel.index();
    res.status(200).json({
      status: 200,
      data: products,
      message: "All Products have been retrieved successfully 😋.",
    });
  } catch (error) {}
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const product = await productModel.getOne(productId);
    res.status(200).json({
      status: 200,
      data: { ...product },
      message: "Product has been retrieved successfully 😋.",
    });
  } catch (error) {
    next(error);
  }
};

export const getByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.body.category as unknown as string;
    const products = await productModel.getByCategory(category);
    res.status(200).json({
      status: 200,
      data: products,
      message: `Products has been retrieved successfully for category ${category} 😋.`,
    });
  } catch (error) {
    next(error);
  }
};

export const getPopular = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.getPopular();
    res.status(200).json({
      status: 200,
      data: products,
      message: `Top 5 Popular Products have been retrieved successfully 😋.`,
    });
  } catch (error) {
    next(error);
  }
};
