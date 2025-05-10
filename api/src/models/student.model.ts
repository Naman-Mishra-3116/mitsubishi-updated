import mongoose, { model, Schema } from "mongoose";
import { IStudentDocument } from "../interface/iStudentDocument";

const StudentSchema = new Schema<IStudentDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    rollNumber: {
      type: String,
      required: true,
      trim: true,
    },
    trainingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Training",
      required: true,
    },
    feedback: {
      type: String,
      default: "",
    },
    studentCollegeName: {
      type: String,
      required: true,
    },
    certificateGenerated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const StudentModel = model<IStudentDocument>("Student", StudentSchema);
