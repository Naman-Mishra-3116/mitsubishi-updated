import { Document } from "mongoose";

export interface IInfoDocument extends Document {
  calenderLink: string;
  nameOfMitsubishiHead: string;
  emailOfMitsubishiHead: string;
  signatureOfMitsubhiHead: string;
  designationOfMitsubhiHead: string;
}
