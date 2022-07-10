import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

import { CustomeError } from "./errorHandler";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.get("Authorization");
    const bearer = auth?.split(" ")[0].toLocaleLowerCase();
    const token = auth?.split(" ")[1];
    if (token && bearer === "bearer") {
      const decode = jwt.verify(token as string, config.tokenSecret as string);
      if (decode) {
        next();
      } else {
        throw new CustomeError("You are not authorized", 401);
      }
    } else {
      throw new CustomeError("You are not authorized", 401);
    }
  } catch (error) {
    let err = error;
    if (!(error instanceof CustomeError)) {
      err = new CustomeError("You are not authorized", 401);
    }
    next(err);
  }
};
