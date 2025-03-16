import express from "express";
import userControllers from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import userValidations from "./user.validation";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    console.log(process.cwd());

    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post(
  "/create-admin",

  // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  upload.single("file"),
  validateRequest(userValidations.createAdmin),
  userControllers.createAdmin
);

export const userRoutes = router;
