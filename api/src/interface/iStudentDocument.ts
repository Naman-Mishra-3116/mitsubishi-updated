import { Document, Types } from "mongoose";

export interface IStudentDocument extends Document {
  name: string;
  email: string;
  rollNumber: string;
  trainingId: Types.ObjectId;
  feedback: string;
  studentCollegeName: string;
  certificateGenerated: boolean;
}
