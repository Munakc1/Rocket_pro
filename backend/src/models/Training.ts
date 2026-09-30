import mongoose, { Document, Schema } from "mongoose";

export interface ILiveTraining extends Document {
  id: string;
  title: string;
  date: string;
  mode: "Online" | "Physical" | "Hybrid";
  status: "Upcoming" | "Registration Closed" | "Completed";
  price: string;
  oldPrice?: string;
  discount?: string;
  instructor: string;
  description: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const liveTrainingSchema = new Schema<ILiveTraining>(
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

    date: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      enum: ["Online", "Physical", "Hybrid"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Registration Closed", "Completed"],
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    oldPrice: {
      type: String,
    },

    discount: {
      type: String,
    },

    instructor: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
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

export default mongoose.model<ILiveTraining>(
  "LiveTraining",
  liveTrainingSchema,
);