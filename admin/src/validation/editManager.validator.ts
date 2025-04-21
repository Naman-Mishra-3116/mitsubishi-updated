import * as yup from "yup";

export const editManagerInitials = {
  managerName: "",
  managerEmail: "",
  phoneNumber: "",
  managerPassword: "",
};

export const editManagerValidation = yup.object().shape({
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
    .required("phone number is required"),

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
