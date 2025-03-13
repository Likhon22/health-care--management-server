import jwt from "jsonwebtoken";
import { TJwtPayload } from "../interfaces/jwt";
const verifyToken = (token: string): TJwtPayload => {
  return jwt.verify(token, "refresh-token") as TJwtPayload;
};
export default verifyToken;
