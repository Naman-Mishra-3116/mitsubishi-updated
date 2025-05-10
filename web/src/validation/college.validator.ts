import * as Yup from "yup";

export type TCollegeInitials = {
  collegeCity: string;
  collegeName: string;

  nameOfHOD: string;
  latitude: number;
  longitude: number;

  collegeLogo: File | undefined;
  logoPreview: string;

  managerSignature: File | undefined;
  managerSignaturePreview: string;

  hodSignature: File | undefined;
  hodSignaturePreview: string;
};

export const collegeInitials = {
  collegeCity: "",
  collegeName: "",
  collegeLogo: undefined,
  managerSignature: undefined,
  hodSignature: undefined,
  managerSignaturePreview: "",
  hodSignaturePreview: "",
  logoPreview: "",
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

  collegeLogo: Yup.mixed<File>()
    .nullable()
    .test("is-signature", "College Logo is required", function (value) {
      const { logoPreview } = this.parent;
      return value instanceof File || !!logoPreview;
    }),

  managerSignature: Yup.mixed<File>()
    .nullable()
    .test("is-signature", "Manger Signature is required", function (value) {
      const { managerSignaturePreview } = this.parent;
      return value instanceof File || !!managerSignaturePreview;
    }),

  hodSignature: Yup.mixed<File>()
    .nullable()
    .test("is-signature", "HOD signature is required", function (value) {
      const { hodSignaturePreview } = this.parent;
      return value instanceof File || !!hodSignaturePreview;
    }),
});
