import { Router } from "express";

import {
  createTrainingRegistration,
} from "../controllers/trainingRegistration.controller.js";

const router = Router();

router.post(
  "/registrations",
  createTrainingRegistration
);

export default router;