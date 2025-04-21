import { Document } from "mongoose";
import { ADMIN_ROLE, PERMISSION } from "../enums/admin.enum";

export interface IAdminUserDocument extends Document {
  fullName: string;
  email: string;
  password: string;
  role: ADMIN_ROLE;
  permission: PERMISSION;
  isBlocked?: boolean;
  about?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phoneNumber?: string;
  profileImage?: string;
}
