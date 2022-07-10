"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authanticate = exports.show = exports.index = exports.create = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const errorHandler_1 = require("../middlewares/errorHandler");
const user_1 = __importDefault(require("../models/user"));
const userModel = new user_1.default();
const create = async (req, res, next) => {
    try {
        const user = await userModel.create(req.body);
        return res.status(201).json({
            status: 201,
            data: { ...user },
            message: "User Created Successfully 😎.",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const index = async (req, res, next) => {
    try {
        const users = await userModel.index();
        return res.status(200).json({
            status: 200,
            data: users,
            message: "All Users Have been retrieved successfully 😋",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.index = index;
const show = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await userModel.show(userId);
        return res.status(200).json({
            status: 200,
            data: { ...user },
            message: "User Has been retrieved successfully 😋",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.show = show;
const authanticate = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.authanticate(email, password);
        if (!user) {
            throw new errorHandler_1.CustomeError("Authentication failed! Email or Password may be wrong try again later 😪", 401);
        }
        const token = jsonwebtoken_1.default.sign(user, config_1.default.tokenSecret);
        res.status(200).json({
            status: 200,
            token,
            message: "User has been authenticated successfully.",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.authanticate = authanticate;
