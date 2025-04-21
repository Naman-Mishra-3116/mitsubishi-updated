import { Document, Types } from "mongoose";

export interface IATCManager extends Document {
  active: boolean;
  dataChanged: boolean;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  listOfATC: Types.ObjectId;
}
