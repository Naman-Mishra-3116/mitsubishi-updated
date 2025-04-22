import * as Yup from "yup";

export const collegeInitials = {
  collegeCity: "",
  collegeName: "",
  collegeLogo: File,
  nameOfHOD: "",
  latitude: 0,
  longitude: 0,
};

export const collegeProfileSchema = Yup.object().shape({
  collegeName: Yup.string()
    .min(10, "College name must be at least 10 characters")
    .required("College name is required"),
  nameOfHOD: Yup.string()
    .min(10, "HOD name must be at least 10 characters")
    .required("Name of HOD is required"),
});
