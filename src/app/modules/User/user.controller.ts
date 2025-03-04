import { Request, Response } from "express";
import userServices from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  const result = await userServices.createAdminIntoDB(req.body);
  res.send(result);
};

const userControllers = {
  createAdmin,
};

export default userControllers;
