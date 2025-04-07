import prisma from "../../shared/prisma";

const getDoctorFromDB = async () => {
  const doctor = await prisma.doctor.findMany();
  return doctor;
};

const doctorServices = {
  getDoctorFromDB,
};

export default doctorServices;
