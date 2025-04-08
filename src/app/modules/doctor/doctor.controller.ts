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

export const getSingleDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await doctorServices.getSingleDoctorFromDB(id);
    sendResponse(res, {
      message: "Doctor fetched successfully",
      success: true,
      statusCode: 200,
      data: result,
    });
  }
);

const doctorController = {
  getDoctors,
  getSingleDoctor,
};
export default doctorController;
