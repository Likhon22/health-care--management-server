import express from "express";
import userControllers from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import userValidations from "./user.validation";

const router = express.Router();

router.post(
  "/create-admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(userValidations.createAdmin),
  userControllers.createAdmin
);

export const userRoutes = router;
