import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route not found",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found",
    },
  });
};

export default notFound;
