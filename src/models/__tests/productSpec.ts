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

    it("should have a get top 5 popular Products method", () => {
      expect(productModel.getPopular).toBeDefined();
    });
  });

  describe("Check Users methods functionality", () => {
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

    it("should get product with id 1", async () => {
      const prod = await productModel.getOne(product.id as unknown as string);
      expect(prod).toEqual(product);
    });
  });
});
