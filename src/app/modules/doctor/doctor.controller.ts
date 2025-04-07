import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import doctorServices from "./doctor.services";

const getDoctors = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorServices.getDoctorFromDB();
  sendResponse(res, {
    message: "Doctor fetched successfully",
    success: true,
    statusCode: 200,
    data: result,
  });
});

const doctorController = {
  getDoctors,
};
export default doctorController;
