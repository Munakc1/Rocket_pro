import express from "express";
import cors from "cors";

import { config } from "./config/config.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import marketRoutes from "./routes/market.routes.js";
import trainingRoutes from "./routes/training.routes.js";
import trainingRegistrationRoutes from "./routes/trainingRegistration.routes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);

app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Rocket Pro backend is running",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

app.use("/api/market", marketRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/training", trainingRoutes);

app.use("/api/training", trainingRegistrationRoutes);

// Start server
const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(
        `Rocket Pro backend running on http://localhost:${config.port}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();