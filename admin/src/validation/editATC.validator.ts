import * as yup from "yup";

export const editATCInitials = {
  atcName: "",
  address: "",
  description: "",
  city: "",
  state: "",
  atcImage: File,
  collegeName: "",
};

export const validateEditATC = yup.object().shape({
  atcName: yup
    .string()
    .required("ATC Name is required")
    .min(8, "Name should contain at least 8 characters")
    .max(30, "Name can contain at most 30 characters"),

  collegeName: yup
    .string()
    .required("College Name is required")
    .min(10, "College name should contain at least 10 characters")
    .max(150, "College name can contain at most 150 characters"),

  address: yup
    .string()
    .required("ATC Address is required")
    .min(20, "Address should contain at least 20 characters")
    .max(400, "Address can contain at most 400 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description should contain at least 20 characters")
    .max(400, "Description can contain at most 400 characters"),

  city: yup
    .string()
    .required("City is required")
    .min(3, "City should contain at least 3 characters")
    .max(30, "City can contain at most 30 characters"),

  state: yup.string().required("State is required"),
});
