import express, { Request, Response } from "express";
import userControllers from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import adminValidations from "../admin/admin.validation";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(adminValidations.adminValidationSchema),
  userControllers.createAdmin
);

export const userRoutes = router;
