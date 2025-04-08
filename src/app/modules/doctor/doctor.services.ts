import prisma from "../../shared/prisma";

const getDoctorFromDB = async () => {
  const doctor = await prisma.doctor.findMany();
  return doctor;
};
const getSingleDoctorFromDB = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
  });
  return doctor;
};

const doctorServices = {
  getDoctorFromDB,
  getSingleDoctorFromDB,
};

export default doctorServices;
