import { Request, Response } from "express";
import adminServices from "./admin.service";

const getAdmin = async (req: Request, res: Response) => {
  try {
    const result = await adminServices.getAdminFromDB(req.query);
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
};

export default adminController;
