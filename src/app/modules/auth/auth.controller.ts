import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import authServices from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);

  const result = await authServices.loginUser(email, password);
  console.log(result);
  sendResponse(res, {
    message: "Login successful",
    data: result,
    success: true,
    statusCode: 200,
  });
});

const authControllers = {
  loginUser,
};

export default authControllers;
