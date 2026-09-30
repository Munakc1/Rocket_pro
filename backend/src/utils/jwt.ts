import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export interface JwtPayload {
  userId: string;
}

export const generateToken = (userId: string) => {
  if (!config.jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    {
      userId,
    },
    config.jwtSecret,
    {
      expiresIn: config.jwtExpiresIn as jwt.SignOptions["expiresIn"],
    }
  );
};