import jwt from "jsonwebtoken";
import { TJwtPayload } from "../interfaces/jwt";

export const createToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expireDate: string
): string => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expireDate as jwt.SignOptions["expiresIn"],
  });
};
