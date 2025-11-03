import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;

  err.message = err.message || "Internal server error";

  //  this is for mongo id error
  if (err.name === "CastError") {
    const message = `Resource not found Invailed Id ${err.path} `;
    err = new ErrorHandler(message, 400);
  }
  // duplicate key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)}`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt Error
  if (err.name === "jsonWebTokenError") {
    const message = `Json web token is invailed, try again `;
    err = new ErrorHandler(message, 400);
  }

  // jwt expired Error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is Expired, try again `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
