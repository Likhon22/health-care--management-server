import { Request, Response } from "express";
import userServices from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createAdminIntoDB(req.body);
    res.status(200).json({
      message: "Admin created successfully",
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

const userControllers = {
  createAdmin,
};

export default userControllers;
