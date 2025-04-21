import { Document, Types } from "mongoose";

export interface ITrainingDocument extends Document {
  isApproved: boolean;
  startDate: Date;
  endDate: Date;
  totalStudents: number;
  title: string;
  atcId: Types.ObjectId;
  description: string;
  trainingImages: string[];
  attendence: string;
  feedback: string;
}
