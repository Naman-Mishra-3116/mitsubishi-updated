import { STATES } from "@/constants/states";
import * as yup from "yup";

export const profileFormInitials = {
  fullName: "",
  email: "",
  phoneNumber: "",
  city: "",
  state: "",
  postalCode: "",
  about: "",
  address: "",
};

export const profileFormValidator = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Name field must contain at least 3 characters")
    .max(20, "Name field can contain at most 20 characters"),

  email: yup.string().email("Invalid Email").required("Email is required"),
  phoneNumber: yup
    .string()
    .test(
      "starts-with-valid-digit",
      "Phone number must start with 6, 7, 8, or 9",
      (value) => !value || /^[6-9]/.test(value)
    )
    .matches(/^[6-9]\d{9}$/, "Invalid Phone Number (must be 10 digits)")
    .required("Phone number is required"),

  city: yup.string().required().min(3, "City name must contain 3 characters"),
  state: yup
    .string()
    .oneOf(STATES, "Invalid State or UT")
    .required("State name is required"),

  postalCode: yup
    .string()
    .matches(/^\d{6}$/, "Invalid Postal Code")
    .required("Postal code is required"),

  about: yup
    .string()
    .min(100, "About field should contain at least 100 characters")
    .max(400, "Abaut field can contain at most 400 characters")
    .required(),

  address: yup
    .string()
    .min(10, "Address field should contain at least 20 characters")
    .max(500, "Address field can contain at most 500 characters")
    .required("Address field is required"),
});
