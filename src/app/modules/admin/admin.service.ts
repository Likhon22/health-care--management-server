import { Admin, Prisma } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constants";
import { calculatePagination } from "../../helpars/paginationHelper";
import prisma from "../../shared/prisma";

const getAdminFromDB = async (params: Record<string, any>, options: any) => {
  const { searchTerm, ...filteredData } = params;

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
      OR: adminSearchAbleFields.map((field) => {
        return {
          [field]: {
            contains: params.searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }
  if (Object.keys(filteredData).length > 0) {
    Object.keys(filteredData).map((key) => {
      andCondition.push({
        AND: {
          [key]: {
            equals: filteredData[key],
          },
        },
      });
    });
  }
  andCondition.push({
    isDeleted: false,
  });
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const whereInput: Prisma.AdminWhereInput = { AND: andCondition };
  const result = await prisma.admin.findMany({
    where: whereInput,
    skip: Number(skip),
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.admin.count({
    where: whereInput,
  });
  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  };
};
const getSingleAdminFromDB = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};
const updateAdminInDB = async (
  id: string,
  payload: Partial<Admin>
): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deleteAdminFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.$transaction(async (tsx) => {
    const adminDeletedData = await tsx.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    const userDeletedData = await tsx.user.update({
      where: {
        email: adminDeletedData.email,
      },
      data: {
        status: "DELETED",
      },
    });
    return adminDeletedData;
  });
  return result;
};

const adminServices = {
  getAdminFromDB,
  getSingleAdminFromDB,
  updateAdminInDB,
  deleteAdminFromDB,
};

export default adminServices;
