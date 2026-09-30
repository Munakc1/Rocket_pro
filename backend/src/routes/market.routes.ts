import { Router } from "express";
import { getMarketTickerController } from "../controllers/market.controller.js";

const router = Router();

router.get("/ticker", getMarketTickerController);

export default router;