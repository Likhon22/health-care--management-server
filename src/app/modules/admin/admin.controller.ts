import { NextFunction, Request, Response } from "express";
import adminServices from "./admin.service";
import { pick } from "../../shared/pick";
import { adminFilterableFields } from "./admin.constants";
import { sendResponse } from "../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
const getAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    console.log(options);

    const result = await adminServices.getAdminFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Admin fetched successfully",
      data: result.data,
      success: true,
      meta: result.meta,
    });
  }
);

const getSingleAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await adminServices.getSingleAdminFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      message: "Admin fetched successfully",
      data: result,
      success: true,
    });
  }
);

const updateAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updatedAdmin = req.body;
    const result = await adminServices.updateAdminInDB(id, updatedAdmin);
    sendResponse(res, {
      statusCode: 200,
      message: "Admin updated successfully",
      data: result,
      success: true,
    });
  }
);

const deleteAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await adminServices.deleteAdminFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      message: "Admin deleted successfully",
      data: result,
      success: true,
    });
  }
);

const adminController = {
  getAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};

export default adminController;
