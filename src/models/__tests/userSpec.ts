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
      email: "kareemfouad@gmail.com",
      password: "123456",
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

    it("Create New User method", async () => {
      const newUser = await userModel.create({
        first_name: "new",
        last_name: "user",
        email: "newuser@gmail.com",
        password: "123456",
      });
      expect(newUser).toEqual({
        id: newUser.id,
        first_name: "new",
        last_name: "user",
        email: "newuser@gmail.com",
      });
    });

    it("get single user from database", async () => {
      const fetchedUser = await userModel.show(user.id as number);
      expect(fetchedUser.email).toEqual(user.email);
    });

    it("index all users in DB", async () => {
      const allUsers = await userModel.index();
      expect(allUsers).toContain({
        first_name: "Kareem",
        last_name: "Fouad",
        email: "kareemfouad@gmail.com",
        id: user.id,
      });
    });

    it("Authenticate user Method", async () => {
      const authuser = await userModel.authanticate(
        user?.email,
        user?.password as string
      );
      expect(authuser).not.toBeNull();
    });
  });
});
