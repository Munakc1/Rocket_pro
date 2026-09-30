import { Router } from "express";

import {
  getCourses,
  getCourseById,
  getLiveTrainings,
  getLiveTrainingById,
} from "../controllers/training.controller.js";

const router = Router();

router.get("/courses", getCourses);
router.get("/courses/:id", getCourseById);

router.get("/live", getLiveTrainings);
router.get("/live/:id", getLiveTrainingById);

export default router;