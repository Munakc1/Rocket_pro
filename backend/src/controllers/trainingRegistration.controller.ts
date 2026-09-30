import { Request, Response } from "express";
import TrainingRegistration from "../models/TrainingRegistration.js";

/*
 * IMPORTANT:
 * Prices are controlled by the backend.
 * Do not trust the price sent by the frontend.
 */

const trainings: Record<
  string,
  {
    title: string;
    price: number;
  }
> = {
  "technical-analysis-live": {
    title: "Technical Analysis Training for Beginners",
    price: 3000,
  },

  "fundamental-analysis-live": {
    title: "Basics of Stock Market and Fundamental Analysis",
    price: 2500,
  },
};

export async function createTrainingRegistration(
  req: Request,
  res: Response
) {
  try {
    const {
      trainingId,
      fullName,
      email,
      phone,
    } = req.body;

    if (!trainingId) {
      return res.status(400).json({
        success: false,
        message: "Training ID is required.",
      });
    }

    if (!fullName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    if (!/^(97|98)\d{8}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Nepal mobile number.",
      });
    }

    const training = trainings[trainingId];

    if (!training) {
      return res.status(404).json({
        success: false,
        message: "Training not found.",
      });
    }

    /*
     * Generate server-side registration ID.
     */

    const registrationId =
      `REG-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;

    const registration =
      await TrainingRegistration.create({
        registrationId,
        trainingId,
        trainingTitle: training.title,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone,
        amount: training.price,
        status: "PENDING_PAYMENT",
      });

    return res.status(201).json({
      success: true,
      message: "Training registration created successfully.",
      data: {
        registrationId: registration.registrationId,
        trainingId: registration.trainingId,
        trainingTitle: registration.trainingTitle,
        amount: registration.amount,
        status: registration.status,
      },
    });
  } catch (error) {
    console.error(
      "Create training registration error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create training registration.",
    });
  }
}