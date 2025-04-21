import mongoose, { Schema, Model } from "mongoose";
import { ICollegeDocument } from "../interface/iCollegeDocument";

const collegeSchema = new Schema<ICollegeDocument>({
  collegeCity: {
    type: String,
    required: true,
  },

  collegeName: {
    type: String,
    unique: true,
    required: true,
  },

  collegeLogo: {
    type: String,
  },

  nameOfHOD: {
    type: String,
  },

  latitude: {
    type: Number,
    required: true,
  },

  longitude: {
    type: Number,
    required: true,
  },
});

export const CollegeModel: Model<ICollegeDocument> = mongoose.model(
  "College",
  collegeSchema
);
