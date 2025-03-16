import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";

import { createToken } from "../../shared/createToken";

import verifyToken from "../../shared/verifyToken";
import { UserStatus } from "@prisma/client";
import config from "../../config";
import { TJwtPayload } from "../../interfaces/jwt";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import { sendPasswordResetEmail } from "./emailSender";

const loginUser = async (email: string, password: string) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: email,
      status: UserStatus.ACTIVE,
    },
  });
  console.log(isUserExists);

  if (!isUserExists) {
    throw new Error("User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExists.password
  );
  if (!isPasswordMatched) {
    throw new Error("Invalid password");
  }
  const jwtPayload: TJwtPayload = {
    email: isUserExists.email,
    role: isUserExists.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt.jwtSecret as string,
    config.jwt.jwtExpiresIn as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt.jwtRefreshSecret as string,
    config.jwt.jwtRefreshExpiresIn as string
  );
  return {
    accessToken,
    needsPasswordChange: isUserExists.needsPasswordChange,
    refreshToken,
  };
};
const refreshToken = async (refreshToken: string) => {
  try {
    const decoded = verifyToken(
      refreshToken,
      config.jwt.jwtRefreshSecret as string
    );
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        email: decoded.email,
        status: UserStatus.ACTIVE,
      },
    });
    const jwtPayload: TJwtPayload = {
      email: userData.email,
      role: userData.role,
    };
    const accessToken = createToken(
      jwtPayload,
      config.jwt.jwtSecret as string,
      config.jwt.jwtExpiresIn as string
    );
    return accessToken;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};
const changePassword = async (
  user: JwtPayload,
  oldPassword: string,
  newPassword: string
) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });
  const isPasswordMatched = await bcrypt.compare(
    oldPassword,
    userData.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid old password");
  }
  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round)
  );
  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password: hashedPassword,
      needsPasswordChange: false,
    },
  });
  return null;
};
const forgetPassword = async (email: string) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!isUserExists) {
    throw new ApiError(401, "User not found");
  }
  const jwtPayload: TJwtPayload = {
    email: isUserExists.email,
    role: isUserExists.role,
  };
  const resetPasswordToken = createToken(
    jwtPayload,
    config.jwt.resetPasswordSecret as string,
    config.jwt.resetPasswordExpiresIn as string
  );

  const resetPasswordLink = `${config.reset_password_url}?id=${isUserExists.type}&token=${resetPasswordToken}`;
  await sendPasswordResetEmail(isUserExists.email, resetPasswordLink);

  return null;
};
const resetPassword = async (
  token: string,
  Payload: { id: string; newPassword: string }
) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      type: Payload.id,
    },
  });
  if (!isUserExists) {
    throw new ApiError(401, "User not found");
  }
  const decoded = verifyToken(token, config.jwt.resetPasswordSecret as string);
  if (decoded.email !== isUserExists.email) {
    throw new ApiError(401, "Invalid token");
  }
  const hashedPassword = await bcrypt.hash(
    Payload.newPassword,
    Number(config.bcrypt_salt_round)
  );
  await prisma.user.update({
    where: {
      email: isUserExists.email,
    },
    data: {
      password: hashedPassword,
    },
  });
  return null;
};

const authServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};

export default authServices;
