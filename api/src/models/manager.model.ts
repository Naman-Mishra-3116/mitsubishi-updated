import mongoose, { Model, Schema } from "mongoose";
import { IATCManager } from "../interface/iATCMangerDocument";

const managerSchema = new Schema<IATCManager>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      required: false,
    },
    dataChanged: {
      type: Boolean,
      required: false,
    },
    listOfATC: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ATC",
    },
  },
  { timestamps: true }
);

export const ATCManager: Model<IATCManager> = mongoose.model(
  "managers",
  managerSchema
);
