import { NextFunction, Request, Response } from "express";
import userServices from "./user.service";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.createAdminIntoDB(req);
    res.status(200).json({
      message: "Admin created successfully",
      data: result,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userServices.createDoctorIntoDB(req);

    res.status(200).json({
      message: "Doctor created successfully",
      data: result,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const userControllers = {
  createAdmin,
  createDoctor,
};

export default userControllers;
