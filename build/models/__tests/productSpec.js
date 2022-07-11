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
    fdescribe("Check Products methods functionality", () => {
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
        it("This method should get single product by id ", async () => {
            const prod = await productModel.getOne(product.id);
            expect(prod).toEqual(product);
        });
        it("This method should index all products from DB", async () => {
            const products = await productModel.index();
            expect(products).toContain(product);
        });
        it("This Method should create new product in DB", async () => {
            const newProduct = await productModel.create({
                name: "Test Product 2",
                price: 200,
                category: "Test",
            });
            expect(newProduct).toEqual({
                id: newProduct.id,
                name: "Test Product 2",
                price: 200,
                category: "Test",
            });
        });
        it("This Method should get products by category", async () => {
            const products = await productModel.getByCategory("cat1");
            expect(products[0].category).toBe("cat1");
        });
    });
});
