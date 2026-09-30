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

// Health check used by Render to verify the service is live
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    service: "rocket-pro-api",
    timestamp: new Date().toISOString(),
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

    const port = config.port;

    // Bind to 0.0.0.0 so Render's proxy can reach the process, and use the
    // PORT Render injects (config.port reads process.env.PORT).
    const server = app.listen(port, "0.0.0.0", () => {
      console.log(`Rocket Pro backend listening on port ${port}`);
    });

    const shutdown = (signal: string) => {
      console.log(`${signal} received, closing server...`);
      server.close(() => process.exit(0));
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();