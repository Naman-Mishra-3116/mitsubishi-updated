import * as yup from "yup";
export type YearlyInfo = {
  name: string;
  email: string;
  designation: string;
  calendar: File | null;
  signature: File | null;
  calendarPreview?: string;
  signaturePreview?: string;
};

export const yearlyInfoFormInital = {
  name: "",
  email: "",
  designation: "",
  calendar: null,
  signature: null,
  calendarPreview: "",
  signaturePreview: "",
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
    .lowercase("email should contain all lowercase letters"),

  designation: yup
    .string()
    .required("designation is required")
    .min(5, "designation should contain at least 5 characters")
    .max(30, "designation can contain at most 30 characters"),

  calendar: yup
    .mixed<File>()
    .nullable()
    .test("is-calendar", "Calendar file is required", function (value) {
      const { calendarPreview } = this.parent;
      return value instanceof File || !!calendarPreview;
    }),

  signature: yup
    .mixed<File>()
    .nullable()
    .test("is-signature", "Signature file is required", function (value) {
      const { signaturePreview } = this.parent;
      return value instanceof File || !!signaturePreview;
    }),
});
