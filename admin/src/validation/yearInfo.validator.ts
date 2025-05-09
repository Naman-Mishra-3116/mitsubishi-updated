import * as yup from "yup";

export type YearlyInfo = {
  name: string;
  email: string;
  designation: string;
  calendar: File | null;
  signature: File | null;
};
export const yearlyInfoFormInital = {
  name: "",
  email: "",
  designation: "",
  calendar: null,
  signature: null,
};

export const yearFormValidator = yup.object().shape({
  name: yup
    .string()
    .required("name is required")
    .min(3, "name field must contain at least 3 characters")
    .max(20, "name field can contain at most 20 characters"),

  email: yup
    .string()
    .email("invalid email")
    .required("email is required")
    .strict()
    .lowercase("email should contain all lowercase letter"),
  designation: yup
    .string()
    .required("designation is required")
    .min(5, "designation should contain at least 5 characters")
    .max(30, "designation can contain at most 30 characters"),

  calendar: yup
    .mixed<File>()
    .required("calendar file is required")
    .test(
      "is-file",
      "calendar must be a valid file",
      (value) => value instanceof File
    ),
});
