import { Document, Types } from "mongoose";
import { IATCDocument } from "./iATCDocument";

export interface ITrainingDocument extends Document {
  isApproved: boolean;
  startDate: Date;
  endDate: Date;
  totalStudents: number;
  title: string;
  atcId: Types.ObjectId | IATCDocument;
  description: string;
  trainingImages: string[];
  attendence: string;
  feedback: string;
}
