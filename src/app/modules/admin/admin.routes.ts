import { Router } from "express";
import adminController from "./admin.controller";

const router = Router();


router.get("/", adminController.getAdmin);
router.get("/:id", adminController.getSingleAdmin);
router.patch("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

export const adminRoutes = router;
