import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async (): Promise<void> => {
  try {
    if (!config.mongoUri) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(config.mongoUri);

    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};