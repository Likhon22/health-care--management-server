import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getAdminFromDB = async (params: Record<string, any>) => {
  const andCondition: Prisma.AdminWhereInput[] = [];
  // [
  //         {
  //           name: {
  //             contains: params.searchTerm,
  //             mode: "insensitive",
  //           },
  //         },
  //         {
  //           email: {
  //             contains: params.searchTerm,
  //             mode: "insensitive",
  //           },
  //         },
  //       ],
  if (params.searchTerm) {
    andCondition.push({
      OR: ["name", "email"].map((field) => {
        return {
          [field]: {
            contains: params.searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }
  const whereInput: Prisma.AdminWhereInput = { AND: andCondition };
  const result = await prisma.admin.findMany({
    where: whereInput,
  });
  return result;
};

const adminServices = {
  getAdminFromDB,
};

export default adminServices;
