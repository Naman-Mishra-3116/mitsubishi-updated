"use client";
import MButton from "@/ui/MButton/MButton";
import MImageInput from "@/ui/MInput/MImageInput";
import MInput from "@/ui/MInput/MInput";
import MTypography from "@/ui/MTypography/MTypography";
import { Box } from "@mantine/core";
import React, { memo, useState } from "react";
import classes from "../styles/index.module.scss";
import { useForm } from "@mantine/form";

const CollegeContainer: React.FC = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string>("");
  const form = useForm({
    initialValues: {
      collegeCity: "",
      collegeName: "",
      collegeLogo: File,
      nameOfHOD: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <Box className={classes.rootBox}>
      <Box className={classes.header}>
        <MTypography
          variant="heading"
          color="white"
          text="College Details"
          className={classes.heading}
        />
        <MTypography
          className={classes.subHeading}
          variant="subTitle"
          text="Complete Details related to college"
          color="white"
        />
      </Box>

      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <MImageInput
          cropShape="rect"
          label="College Logo"
          handleFormSave={(file) => setFile(file)}
          className={classes.file}
          error={form.errors.collegeLogo as string}
        />

        <MInput
          required
          variant="text"
          label="College Name"
          className={classes.fullGrid}
          placeholder="Name of college"
          formHandler={form.getInputProps("collegeName")}
        />

        <MInput
          required
          variant="text"
          label="College City"
          placeholder="Indore"
          formHandler={form.getInputProps("collegeCity")}
        />

        <MInput
          required
          variant="text"
          label="Name of HOD"
          placeholder="John Doe"
          formHandler={form.getInputProps("nameOfHOD")}
        />

        <MInput
          required
          variant="text"
          label="Latitude"
          placeholder="22.5"
          formHandler={form.getInputProps("latitude")}
        />

        <MInput
          required
          variant="text"
          label="Longitude"
          placeholder="85.22"
          formHandler={form.getInputProps("longitude")}
        />

        <MButton type="submit" text="Update" radius="md" variant="filled" />
      </form>
    </Box>
  );
};

export default memo(CollegeContainer);
