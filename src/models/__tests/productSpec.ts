import db from "../../database";
import ProductModel from "../../models/product";
import { Product } from "../../types";

const productModel = new ProductModel();

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
  });

  describe("Check Products methods functionality", () => {
    const product: Product = {
      name: "Product1",
      price: 100,
      category: "cat1",
    };

    beforeAll(async () => {
      const newProduct = await productModel.create(product);
      product.id = newProduct.id;
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql = "DELETE FROM Products";
      await connection.query(sql);
      connection.release();
    });

    it("This method should get single product by id ", async () => {
      const prod = await productModel.getOne(product.id as unknown as string);
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
