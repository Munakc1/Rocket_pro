import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
  id: string;
  title: string;
  description: string;
  lessons: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  duration: string;
  icon?: string;
  topics: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    lessons: {
      type: Number,
      required: true,
      min: 0,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
    },

    topics: {
      type: [String],
      default: [],
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ICourse>("Course", courseSchema);