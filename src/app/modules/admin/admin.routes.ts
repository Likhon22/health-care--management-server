import { Router } from "express";
import adminController from "./admin.controller";

const router = Router();

router.get("/", adminController.getAdmin);

export const adminRoutes = router;
