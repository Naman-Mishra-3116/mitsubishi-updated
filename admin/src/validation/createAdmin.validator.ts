import { STATES } from "@/constants/states";
import * as yup from "yup";

export const createAdminInital = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  permission: "",
  city: "",
  state: "",
  about: "",
  address: "",
  profileImage: File,
  adminType: "",
};

export const createAdminValidator = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Name field must contain at least 3 characters")
    .max(20, "Name field can contain at most 20 characters"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .strict()
    .lowercase("Email should contain all lowercase letter"),

  phoneNumber: yup
    .string()
    .test(
      "starts-with-valid-digit",
      "Phone number must start with 6, 7, 8, or 9",
      (value) => {
        if (value) {
          return /^[6-9]/.test(value);
        }
      }
    )
    .matches(/^[6-9]\d{9}$/, "Invalid Phone Number (must be 10 digits)")
    .required("Phone number is required"),

  city: yup.string().optional(),
  state: yup.string().optional(),

  about: yup
    .string()
    .optional()
    .max(400, "Abaut field can contain at most 400 characters"),

  address: yup
    .string()
    .optional()
    .max(500, "Address field can contain at most 500 characters"),

  adminType: yup
    .string()
    .oneOf(["Super Admin", "Sub Admin"])
    .required("Required"),

  permission: yup
    .string()
    .oneOf(["READ", "WRITE"])
    .required("Permission is required"),

  password: yup
    .string()
    .min(6, "Password should contain at least 6 characters")
    .max(10, "Password can contain at most 10 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});
