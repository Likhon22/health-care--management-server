import express from "express";
import userControllers from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import adminValidations from "../admin/admin.validation";

import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-admin",
  auth("SUPER_ADMIN"),
  validateRequest(adminValidations.adminValidationSchema),
  userControllers.createAdmin
);

export const userRoutes = router;
