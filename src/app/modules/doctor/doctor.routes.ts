import { Router } from "express";
import doctorController from "./doctor.controller";

const router = Router();

router.get("/", doctorController.getDoctors);

export const doctorRoutes = router;
