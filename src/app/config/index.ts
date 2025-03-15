import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    jwtRefreshSecret: process.env.REFRESH_TOKEN_SECRET,
    jwtRefreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
};
