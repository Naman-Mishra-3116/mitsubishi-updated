import * as yup from "yup";
import * as XLSX from "xlsx";

export const createTrainingInitails = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  attendence: null,
  totalStudents: 0,
  trainingImages: [],
};

export const trainingFormSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "title should contain at least 5 characters")
    .max(30, "Title can contain at most 30 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "description should contain at least 10 characters")
    .max(500, "Title can contain at most 500 characters"),
  startDate: yup
    .date()
    .required("Start date is required")
    .typeError("Invalid start date"),
  endDate: yup
    .date()
    .required("End date is required")
    .typeError("Invalid end date")
    .min(yup.ref("startDate"), "End date must be after start date"),
  attendence: yup
    .mixed<File>()
    .required("Attendance file is required")
    .test(
      "is-file",
      "Attendance must be a valid file",
      (value) => value instanceof File
    ),
  totalStudents: yup
    .number()
    .required("Total students is required")
    .typeError("Total students must be a number")
    .min(1, "There must be at least one student"),
  trainingImages: yup
    .array()
    .of(
      yup
        .mixed<File>()
        .test(
          "is-file",
          "Must be a valid file",
          (value) => value instanceof File
        )
    )
    .min(1, "At least one training image is required"),
});

export const validateExcelColumns = async (file: File | null) => {
  if (!file) return false;

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

  const expectedHeaders = [
    "Name",
    "RollNumber",
    "Email",
    "TotalAttendance",
    "Feedback",
  ];
  const headers = json[0] || [];

  const hasExactHeaders =
    headers.length === expectedHeaders.length &&
    headers.every((header, index) => header === expectedHeaders[index]);

  return hasExactHeaders;
};
