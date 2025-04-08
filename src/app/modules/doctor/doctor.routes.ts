import { Router } from "express";
import doctorController from "./doctor.controller";

const router = Router();

router.get("/", doctorController.getDoctors);
router.get("/:id", doctorController.getSingleDoctor);
export const doctorRoutes = router;
