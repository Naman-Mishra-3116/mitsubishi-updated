import { Document, Types } from "mongoose";
import { ICollegeDocument } from "./iCollegeDocument";

export interface IATCDocument extends Document {
  atcName: string;
  atcImage: string;
  address: string;
  description: string;
  state: string;
  active: boolean;
  trainings: Types.ObjectId[];
  collegeID: Types.ObjectId | ICollegeDocument;
}
