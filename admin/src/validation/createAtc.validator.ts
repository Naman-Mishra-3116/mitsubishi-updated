import * as yup from "yup";

export const createATCIntials = {
  atcName: "",
  address: "",
  description: "",
  city: "",
  state: "",
  managerName: "",
  managerEmail: "",
  managerPassword: "",
  phoneNumber: "",
  atcImage: File,
  collegeName: "",
};

export const validateCreateATC = yup.object().shape({
  atcName: yup
    .string()
    .required("ATC Name is required")
    .min(8, "name should contain at least 8 letters")
    .max(30, "name can contain at most 30 letters"),

  collegeName: yup
    .string()
    .required("College Name is required")
    .min(10, "College name should contain at least 10 letters")
    .max(150, "College name can contain at most 150 letters"),

  address: yup
    .string()
    .required("ATC Address is required")
    .min(20, "address should contain at least 20 character")
    .max(400, "address can contain at most 400 characters"),

  description: yup
    .string()
    .required("description is required")
    .min(20, "description should contain at least 20 character")
    .max(400, "description can contain at most 400 characters"),

  city: yup
    .string()
    .required("city is required")
    .min(3, "city should contain at least 3 letters")
    .max(30, "city can contain at most 30 characters"),

  state: yup.string().required("state is required"),

  managerName: yup
    .string()
    .required("manager name is required")
    .min(3, "manager name field must contain at least 3 characters")
    .max(20, "manager name field can contain at most 20 characters"),

  managerEmail: yup
    .string()
    .email("invalid email")
    .required("email is required")
    .strict()
    .lowercase("email should contain all lowercase letter"),

  phoneNumber: yup
    .string()
    .test(
      "starts-with-valid-digit",
      "phone number must start with 6, 7, 8, or 9",
      (value) => {
        if (value) {
          return /^[6-9]/.test(value);
        }
      }
    )
    .matches(/^[6-9]\d{9}$/, "invalid phone number (must be 10 digits)")
    .required(
      "Please enter a random 10-digit number if the actual phone number is unavailable. You can update it later."
    ),

  managerPassword: yup
    .string()
    .min(6, "password should contain at least 6 characters")
    .max(10, "password can contain at most 10 characters")
    .matches(/[A-Z]/, "password must contain at least one uppercase letter")
    .matches(/[a-z]/, "password must contain at least one lowercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "password must contain at least one special character"
    )
    .required("password is required"),
});
