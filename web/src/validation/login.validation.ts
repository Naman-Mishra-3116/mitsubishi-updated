import * as yup from "yup";

export const loginFormInitial = {
  email: "",
  password: "",
};

export const loginFormValidation = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .strict()
    .lowercase("Email should contain all lowercase letter"),

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
