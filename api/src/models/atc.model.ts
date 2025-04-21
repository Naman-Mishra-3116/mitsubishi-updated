import mongoose, { Schema, Model } from "mongoose";
import { IATCDocument } from "../interface/iATCDocument";

const atcModelSchema = new Schema<IATCDocument>(
  {
    atcName: {
      type: String,
      unique: true,
      required: true,
    },

    atcImage: {
      type: String,
      required: [true, "ATC image is required"],
    },

    collegeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: true,
    },
    trainings: [
      { type: mongoose.Types.ObjectId, ref: "Training", default: [] },
    ],
  },
  { timestamps: true }
);

export const ATC: Model<IATCDocument> = mongoose.model("ATC", atcModelSchema);
