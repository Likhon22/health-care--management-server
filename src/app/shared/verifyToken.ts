import jwt from "jsonwebtoken";
import { TJwtPayload } from "../interfaces/jwt";
const verifyToken = (token: string, secret: string): TJwtPayload => {
  return jwt.verify(token, secret) as TJwtPayload;
};
export default verifyToken;
