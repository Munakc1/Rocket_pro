import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 5000,

  mongoUri: process.env.MONGODB_URI || "",

  frontendUrl:
    process.env.FRONTEND_URL || "http://localhost:3000",

  jwtSecret: process.env.JWT_SECRET || "",

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

  smtpHost: process.env.SMTP_HOST || "",

  smtpPort: Number(process.env.SMTP_PORT) || 587,

  smtpUser: process.env.SMTP_USER || "",

  smtpPassword: process.env.SMTP_PASSWORD || "",
};