import mongoose, { Schema, Model } from "mongoose";
import { IInfoDocument } from "../interface/iInfoDocument";

const schema = new Schema<IInfoDocument>(
  {
    calenderLink: {
      type: String,
      required: true,
    },
    nameOfMitsubishiHead: { type: String, required: true },
    emailOfMitsubishiHead: { type: String, required: true },
  },
  { timestamps: true }
);

export const InfoModel: Model<IInfoDocument> = mongoose.model(
  "infomodel",
  schema
);
