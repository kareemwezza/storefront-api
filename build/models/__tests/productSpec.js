"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const product_1 = __importDefault(require("../../models/product"));
const productModel = new product_1.default();
describe("Product Model", () => {
    describe("Check Product Methods existence", () => {
        it("should have index Products method", () => {
            expect(productModel.index).toBeDefined();
        });
        it("should have a get single Product method", () => {
            expect(productModel.getOne).toBeDefined();
        });
        it("should have a create Product method", () => {
            expect(productModel.create).toBeDefined();
        });
        it("should have a get Product by category method", () => {
            expect(productModel.getByCategory).toBeDefined();
        });
        it("should have a get top 5 popular Products method", () => {
            expect(productModel.getPopular).toBeDefined();
        });
    });
    describe("Check Users methods functionality", () => {
        const product = {
            name: "Product1",
            price: 100,
            category: "cat1",
        };
        beforeAll(async () => {
            const newProduct = await productModel.create(product);
            product.id = newProduct.id;
        });
        afterAll(async () => {
            const connection = await database_1.default.connect();
            const sql = "DELETE FROM Products";
            await connection.query(sql);
            connection.release();
        });
        it("should get product with id 1", async () => {
            const prod = await productModel.getOne(product.id);
            expect(prod).toEqual(product);
        });
    });
});
