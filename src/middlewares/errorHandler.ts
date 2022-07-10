import { NextFunction, Request, Response } from "express";

export class CustomeError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super();
    this.statusCode = statusCode || 501;
    this.message =
      message ||
      "Internal Server Error Occured! We are sorry for this inconvenience 😢. Please Try again later.";
  }
}

export default (
  error: Error | CustomeError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  let err = error;
  if (!(err instanceof CustomeError)) {
    err = new CustomeError(err.message, 501);
  }
  return res.status((err as CustomeError).statusCode).json(err);
};
