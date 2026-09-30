import mongoose, { Document, Schema } from "mongoose";

export interface ITrainingRegistration extends Document {
  registrationId: string;
  trainingId: string;
  trainingTitle: string;
  fullName: string;
  email: string;
  phone: string;
  amount: number;
  status: "PENDING_PAYMENT" | "PAID" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
}

const trainingRegistrationSchema =
  new Schema<ITrainingRegistration>(
    {
      registrationId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

      trainingId: {
        type: String,
        required: true,
      },

      trainingTitle: {
        type: String,
        required: true,
      },

      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      amount: {
        type: Number,
        required: true,
        min: 0,
      },

      status: {
        type: String,
        enum: [
          "PENDING_PAYMENT",
          "PAID",
          "CANCELLED",
        ],
        default: "PENDING_PAYMENT",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model<ITrainingRegistration>(
  "TrainingRegistration",
  trainingRegistrationSchema
);