import mongoose, { Model } from "mongoose";
import { ITrainingDocument } from "../interface/iTrainingDocument";

const trainingSchema = new mongoose.Schema<ITrainingDocument>(
  {
    isApproved: {
      type: Boolean,
      required: false,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    totalStudents: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    atcId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ATC",
      required: true,
    },

    trainingImages: {
      type: [String],
      required: true,
    },

    attendence: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Training: Model<ITrainingDocument> = mongoose.model(
  "Training",
  trainingSchema
);


