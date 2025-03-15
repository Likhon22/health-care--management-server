import { NextFunction, Request, Response } from "express";
import config from "../config";
import verifyToken from "../shared/verifyToken";
import ApiError from "../errors/ApiError";

const auth = (...roles: String[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(403, "Token is required");
      }
      const decoded = verifyToken(token, config.jwt.jwtSecret as string);
      if (roles.length && !roles.includes(decoded.role)) {
        throw new ApiError(403, "Unauthorized");
      }
      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
