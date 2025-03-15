import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import authServices from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authServices.loginUser(email, password);
  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  console.log(result);
  sendResponse(res, {
    message: "Login successful",
    data: {
      accessToken: result.accessToken,
      needsPasswordChange: result.needsPasswordChange,
    },
    success: true,
    statusCode: 200,
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await authServices.refreshToken(refreshToken);
  sendResponse(res, {
    message: "Token refreshed",
    data: {
      accessToken: result,
    },
    success: true,
    statusCode: 200,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { oldPassword, newPassword } = req.body;
  const result = await authServices.changePassword(
    user,
    oldPassword,
    newPassword
  );
  sendResponse(res, {
    message: "Password changed successfully",
    success: true,
    statusCode: 200,
    data: null,
  });
});
const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await authServices.forgetPassword(email);
  sendResponse(res, {
    message: "Password reset link sent to your email",
    success: true,
    statusCode: 200,
    data: null,
  });
});
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || "";
  const result = await authServices.resetPassword(token, req.body);
  sendResponse(res, {
    message: "Password reset successful",
    success: true,
    statusCode: 200,
    data: null,
  });
});

const authControllers = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};

export default authControllers;
