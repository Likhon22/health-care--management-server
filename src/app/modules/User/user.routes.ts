import express from "express";
import userControllers from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import userValidations from "./user.validation";
import { upload } from "../../helpars/fileUploader";
import parseBodyData from "../../middlewares/dataParser";

const router = express.Router();

router.post(
  "/create-admin",

  // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  upload.single("file"),

  parseBodyData,

  validateRequest(userValidations.createAdmin),
  userControllers.createAdmin
);

router.post(
  "/create-doctor",
  upload.single("file"),
  parseBodyData,
  validateRequest(userValidations.createDoctor),
  userControllers.createDoctor
);
export const userRoutes = router;
