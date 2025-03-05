import { Request, Response } from "express";
import adminServices from "./admin.service";
import { pick } from "../../shared/pick";
import { adminFilterableFields } from "./admin.constants";

const getAdmin = async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  try {
    console.log(options);

    const result = await adminServices.getAdminFromDB(filters, options);

    res.status(200).json({
      message: "Admin fetched successfully",
      data: result.data,
      meta: result.meta,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err?.name || "Internal server error",
      success: false,
      error: err,
    });
  }
};

const getSingleAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await adminServices.getSingleAdminFromDB(id);
    res.status(200).json({
      message: "Admin fetched successfully",
      data: result,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err?.name || "Internal server error",
      success: false,
      error: err,
    });
  }
};
const adminController = {
  getAdmin,
  getSingleAdmin,
};

export default adminController;
