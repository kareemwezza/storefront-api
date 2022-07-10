import db from "../../database";
import UserModel from "../../models/user";
import { User } from "../../types";

const userModel = new UserModel();

describe("User Model", () => {
  describe("Check Users models existence", () => {
    it("should have index users method", () => {
      expect(userModel.index).toBeDefined();
    });

    it("should have get single user method", () => {
      expect(userModel.show).toBeDefined();
    });

    it("should have create user method", () => {
      expect(userModel.create).toBeDefined();
    });

    it("should have authenticate users method", () => {
      expect(userModel.authanticate).toBeDefined();
    });
  });

  describe("Check Users methods functionality", () => {
    const user: User = {
      first_name: "Kareem",
      last_name: "Fouad",
      email: "kareemfouad27@gmail.com",
      password: "Wezza999",
    };

    beforeAll(async () => {
      const newuser = await userModel.create(user);
      user.id = newuser.id;
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql = "DELETE FROM Users";
      await connection.query(sql);
      connection.release();
    });

    it("should have authenticate users method", async () => {
      const auth = await userModel.authanticate(
        user.email,
        user.password as string
      );
      expect(auth?.email).toEqual(user.email);
    });
  });
});
