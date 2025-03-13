import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Something went wrong",
    error: err,
  });
};

export default globalErrorHandler;
