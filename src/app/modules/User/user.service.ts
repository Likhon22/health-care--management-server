import { UserRole } from "@prisma/client";

import bcrypt from "bcrypt";
import prisma from "../../shared/prisma";
import config from "../../config";

const createAdminIntoDB = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_round)
  );

  const userData = {
    email: payload.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (tsx) => {
    await tsx.user.create({
      data: userData,
    });
    const adminData = await tsx.admin.create({
      data: payload.admin,
    });
    return adminData;
  });
  return result;
};

const userServices = {
  createAdminIntoDB,
};

export default userServices;
