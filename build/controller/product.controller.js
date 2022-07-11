"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByCategory = exports.getById = exports.index = exports.create = void 0;
const product_1 = __importDefault(require("../models/product"));
const productModel = new product_1.default();
const create = async (req, res, next) => {
    try {
        const product = await productModel.create(req.body);
        res.status(201).json({
            status: 201,
            data: { ...product },
            message: "Product has been created successfully 😋.",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const index = async (req, res, next) => {
    try {
        const products = await productModel.index();
        res.status(200).json({
            status: 200,
            data: products,
            message: "All Products have been retrieved successfully 😋.",
        });
    }
    catch (error) { }
};
exports.index = index;
const getById = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await productModel.getOne(productId);
        res.status(200).json({
            status: 200,
            data: { ...product },
            message: "Product has been retrieved successfully 😋.",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getById = getById;
const getByCategory = async (req, res, next) => {
    try {
        const category = req.body.category;
        const products = await productModel.getByCategory(category);
        res.status(200).json({
            status: 200,
            data: products,
            message: `Products has been retrieved successfully for category ${category} 😋.`,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getByCategory = getByCategory;
