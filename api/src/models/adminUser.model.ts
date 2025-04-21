import { model, Schema } from "mongoose";
import { ADMIN_ROLE, PERMISSION } from "../enums/admin.enum";
import { IAdminUserDocument } from "../interface/iAdminUserDocument";

const adminUserSchema = new Schema<IAdminUserDocument>(
  {
    fullName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: Object.values(ADMIN_ROLE),
    },

    permission: {
      type: String,
      required: true,
      enum: Object.values(PERMISSION),
    },

    about: {
      type: String,
    },

    address: {
      type: String,
    },

    city: {
      type: String,
    },

    state: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },

    profileImage: {
      type: String,
    },

    postalCode: {
      type: String,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const AdminUser = model<IAdminUserDocument>(
  "AdminUser",
  adminUserSchema
);
