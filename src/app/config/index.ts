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
    resetPasswordSecret: process.env.RESET_PASSWORD_SECRET,
    resetPasswordExpiresIn: process.env.RESET_PASSWORD_EXPIRES_IN,
  },
  reset_password_url: process.env.RESET_PASSWORD_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
