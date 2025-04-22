import { Document, Types } from "mongoose";
import { IATCDocument } from "./iATCDocument";

export interface IATCManager extends Document {
  active: boolean;
  dataChanged: boolean;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  listOfATC: Types.ObjectId | IATCDocument;
}
