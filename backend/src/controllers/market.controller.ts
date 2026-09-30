import { Request, Response } from "express";
import { getMarketTicker } from "../services/market.service.js";

export async function getMarketTickerController(_req: Request, res: Response) {
  try {
    const result = await getMarketTicker();

    res.status(200).json(result);
  } catch (error) {
    console.error("Market ticker error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch market ticker",
    });
  }
}




