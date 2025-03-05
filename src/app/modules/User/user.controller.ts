import { NextFunction, Request, Response } from "express";
import userServices from "./user.service";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.createAdminIntoDB(req.body);
    res.status(200).json({
      message: "Admin created successfully",
      data: result,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const userControllers = {
  createAdmin,
};

export default userControllers;
