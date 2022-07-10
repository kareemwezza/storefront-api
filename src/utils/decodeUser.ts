import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { User } from "../types";

export default (req: Request): User => {
  const token = req.get("Authorization")?.split(" ")[1];
  const user = jwt.decode(token as string) as User;
  return user;
};
