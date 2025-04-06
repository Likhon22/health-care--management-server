import { Admin, Doctor, UserRole } from "@prisma/client";

import bcrypt from "bcrypt";
import prisma from "../../shared/prisma";
import config from "../../config";
import { sendImageToCloudinary } from "../../helpars/fileUploader";

const createAdminIntoDB = async (payload: any) => {
  const adminData: Admin = payload.body.admin;
  console.log(payload.body);
  const file = payload.file;

  if (file) {
    const uploadedImage = sendImageToCloudinary(file);
    adminData.profilePhoto = (await uploadedImage).uploadResult.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(
    payload?.body?.password,
    Number(config.bcrypt_salt_round)
  );

  const userData = {
    email: adminData.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  await prisma.$transaction(async (tsx) => {
    await tsx.user.create({
      data: userData,
    });
    const result = await tsx.admin.create({
      data: adminData,
    });
    return result;
  });
};
const createDoctorIntoDB = async (payload: any) => {
  const doctorData: Doctor = payload?.body?.doctor;
  const file = payload?.body?.file;
  if (file) {
    const uploadedImage = sendImageToCloudinary(file);
    doctorData.profilePhoto = (await uploadedImage).uploadResult.secure_url;
  }
  const hashedPassword: string = await bcrypt.hash(
    payload?.body?.password,
    Number(config.bcrypt_salt_round)
  );
  const userData = {
    email: doctorData.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };
  const result = await prisma.$transaction(async (tsx) => {
    await tsx.user.create({
      data: userData,
    });
    const doctor = await tsx.doctor.create({
      data: doctorData,
    });

    return doctor;
  });

  return result;
};

const userServices = {
  createAdminIntoDB,
  createDoctorIntoDB,
};

export default userServices;
