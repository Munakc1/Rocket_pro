import { Request, Response } from "express";
import Course from "../models/Course.js";
import LiveTraining from "../models/Training.js";

export async function getCourses(
  req: Request,
  res: Response,
) {
  try {
    const { level, search } = req.query;

    const filter: Record<string, unknown> = {
      isPublished: true,
    };

    if (
      level &&
      ["Beginner", "Intermediate", "Advanced"].includes(
        String(level),
      )
    ) {
      filter.level = String(level);
    }

    if (search) {
      const searchRegex = new RegExp(String(search), "i");

      filter.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { topics: searchRegex },
      ];
    }

    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Get courses error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
}

export async function getCourseById(
  req: Request,
  res: Response,
) {
  try {
    const course = await Course.findOne({
      id: req.params.id,
      isPublished: true,
    }).lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Get course error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch course",
    });
  }
}

export async function getLiveTrainings(
  req: Request,
  res: Response,
) {
  try {
    const { search, status } = req.query;

    const filter: Record<string, unknown> = {
      isPublished: true,
    };

    if (status) {
      filter.status = String(status);
    }

    if (search) {
      const searchRegex = new RegExp(String(search), "i");

      filter.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { instructor: searchRegex },
      ];
    }

    const trainings = await LiveTraining.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      data: trainings,
    });
  } catch (error) {
    console.error("Get live trainings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch live training",
    });
  }
}

export async function getLiveTrainingById(
  req: Request,
  res: Response,
) {
  try {
    const training = await LiveTraining.findOne({
      id: req.params.id,
      isPublished: true,
    }).lean();

    if (!training) {
      return res.status(404).json({
        success: false,
        message: "Live training not found",
      });
    }

    return res.json({
      success: true,
      data: training,
    });
  } catch (error) {
    console.error("Get live training error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch live training",
    });
  }
}