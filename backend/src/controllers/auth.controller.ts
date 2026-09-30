import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import type { HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";
import type { AuthResponse, User as PublicUser } from "@rocket_pro/types";
import { User, type IUser } from "../models/User.js";
import { config } from "../config/config.js";
import { generateToken } from "../utils/jwt.js";
import { sendPasswordResetEmail } from "../utils/email.js";

const BCRYPT_ROUNDS = 12;

// The reset link says "expires in 15 minutes" in the email template — keep the
// two in sync.
const RESET_TOKEN_TTL_MS = 15 * 60 * 1000;

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

// Express 4 does not catch rejected promises from async handlers, so a thrown
// error would take the process down instead of reaching the error handler.
const asyncHandler =
  (fn: AsyncHandler) =>
  (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };

const toPublicUser = (user: HydratedDocument<IUser>): PublicUser => ({
  id: String(user._id),
  email: user.email,
  name: user.fullName,
  createdAt: new Date(user.createdAt).toISOString(),
});

const sha256 = (value: string) =>
  crypto.createHash("sha256").update(value).digest("hex");

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, phone, password } = req.body as Partial<IUser>;

  if (!fullName || !email || !phone || !password) {
    res.status(400).json({
      error: "fullName, email, phone and password are required",
    });
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (await User.findOne({ email: normalizedEmail })) {
    res.status(409).json({ error: "An account with that email already exists" });
    return;
  }

  const user = await User.create({
    fullName,
    email: normalizedEmail,
    phone,
    password: await bcrypt.hash(password, BCRYPT_ROUNDS),
  });

  const response: AuthResponse = {
    token: generateToken(String(user._id)),
    user: toPublicUser(user),
  };

  res.status(201).json(response);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ error: "email and password are required" });
    return;
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  // One message for "no such account" and "wrong password" alike, so this
  // endpoint can't be used to find out which emails are registered.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const response: AuthResponse = {
    token: generateToken(String(user._id)),
    user: toPublicUser(user),
  };

  res.status(200).json(response);
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body as { email?: string };

  if (!email) {
    res.status(400).json({ error: "email is required" });
    return;
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (user) {
    const token = crypto.randomBytes(32).toString("hex");

    // Store a hash of the token, never the token itself: a leaked database
    // should not hand out working reset links.
    user.resetPasswordToken = sha256(token);
    user.resetPasswordExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${config.frontendUrl}/reset-password?token=${token}`
    );
  }

  // Same response either way — see the note in `login`.
  res.status(200).json({
    message: "If that email is registered, a reset link has been sent",
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body as {
    token?: string;
    password?: string;
  };

  // The route is /reset-password/:token, so the token comes from the URL; the
  // body copy is just a fallback in case the frontend sends it there instead.
  const rawToken = (req.params.token as string | undefined) ?? token;

  if (!rawToken || !password) {
    res.status(400).json({ error: "token and password are required" });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ error: "password must be at least 8 characters" });
    return;
  }

  const user = await User.findOne({
    resetPasswordToken: sha256(rawToken),
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    res
      .status(400)
      .json({ error: "This reset link is invalid or has expired" });
    return;
  }

  user.password = await bcrypt.hash(password, BCRYPT_ROUNDS);
  // Clearing the fields makes the link single-use.
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password updated" });
});
