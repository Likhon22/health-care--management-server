import { NextFunction, Request, Response } from "express";
import adminServices from "./admin.service";
import { pick } from "../../shared/pick";
import { adminFilterableFields } from "./admin.constants";
import { sendResponse } from "../../shared/sendResponse";
import httpStatus from "http-status";
const getAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  try {
    console.log(options);

    const result = await adminServices.getAdminFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Admin fetched successfully",
      data: result.data,
      success: true,
      meta: result.meta,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await adminServices.getSingleAdminFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      message: "Admin fetched successfully",
      data: result,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const result = await adminServices.updateAdminInDB(id, updatedData);
    res.status(200).json({
      message: "Admin updated successfully",
      data: result,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await adminServices.deleteAdminFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      message: "Admin deleted successfully",
      data: result,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const adminController = {
  getAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};

export default adminController;
