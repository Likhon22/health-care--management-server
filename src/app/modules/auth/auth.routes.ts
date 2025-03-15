import express from "express";
import authControllers from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import authValidations from "./auth.validation";

const router = express.Router();

router.post("/login", authControllers.loginUser);
router.post("/refresh-token", authControllers.refreshToken);
router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT, UserRole.SUPER_ADMIN),
  validateRequest(authValidations.changePasswordValidationSchema),
  authControllers.changePassword
);

export const authRoutes = router;
