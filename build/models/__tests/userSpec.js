"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const user_1 = __importDefault(require("../../models/user"));
const userModel = new user_1.default();
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
        const user = {
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
            const connection = await database_1.default.connect();
            const sql = "DELETE FROM Users";
            await connection.query(sql);
            connection.release();
        });
        it("should have authenticate users method", async () => {
            const auth = await userModel.authanticate(user.email, user.password);
            expect(auth?.email).toEqual(user.email);
        });
    });
});
