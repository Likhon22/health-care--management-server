import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createToken } from "../../shared/createToken";
import { TJwtPayload } from "../../interfaces/jwt";
import verifyToken from "../../shared/verifyToken";
import { UserStatus } from "@prisma/client";

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

  const accessToken = createToken(jwtPayload, "access-secret", "15m");

  const refreshToken = createToken(jwtPayload, "refresh-token", "30d");
  return {
    accessToken,
    needsPasswordChange: isUserExists.needsPasswordChange,
    refreshToken,
  };
};
const refreshToken = async (refreshToken: string) => {
  try {
    const decoded = verifyToken(refreshToken);
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
    const accessToken = createToken(jwtPayload, "access-secret", "15m");
    return accessToken;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

const authServices = {
  loginUser,
  refreshToken,
};

export default authServices;
