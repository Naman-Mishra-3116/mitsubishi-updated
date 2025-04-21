import { Document } from "mongoose";

export interface ICollegeDocument extends Document {
  collegeName: string;
  collegeCity: string;
  collegeLogo: string;
  nameOfHOD: string;
  latitude: number;
  longitude: number;
}
