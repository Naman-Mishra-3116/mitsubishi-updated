"use client";
import { useGetCollegeProfile } from "@/hooks/query/useGetCollegeProfile.query";
import MButton from "@/ui/MButton/MButton";
import MImageInput from "@/ui/MInput/MImageInput";
import MInput from "@/ui/MInput/MInput";
import MTypography from "@/ui/MTypography/MTypography";
import { Box } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { memo, useEffect, useState } from "react";
import classes from "../styles/index.module.scss";
import { useCompleteProfileMutation } from "@/hooks/mutation/useCompleteCollegeProfile.mutation";
import {
  collegeInitials,
  collegeProfileSchema,
} from "@/validation/college.validator";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { notifications } from "@mantine/notifications";

const CollegeContainer: React.FC = () => {
  const { mutateAsync } = useCompleteProfileMutation();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string>("");
  const { data } = useGetCollegeProfile();
  const [mode, setMode] = useState<"edit" | "update">("edit");
  const form = useForm({
    initialValues: collegeInitials,
    validate: yupResolver(collegeProfileSchema),
  });
  const queryClient = useQueryClient();

  const handleSubmit = async (values: typeof form.values) => {
    if (!file) {
      form.setFieldError("collegeLogo", "This field is required");
      return;
    }

    const formData = new FormData();
    formData.append("collegeName", values.collegeName);
    formData.append("nameOfHOD", values.nameOfHOD);
    if (file) {
      formData.append("collegeLogo", file);
    }

    const resp = await mutateAsync(formData);
    if (resp.status === "success") {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_CENTERS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COLLEGE_PROFILE_DATA],
      });
      setMode("edit");
    }

    notifications.show({
      message: resp.message,
      color: resp.status === "success" ? "green" : "red",
    });
  };

  useEffect(() => {
    if (data && data?.data) {
      const {
        collegeCity,
        collegeLogo,
        collegeName,
        nameOfHOD,
        latitude,
        longitude,
      } = data?.data;

      if (collegeLogo) {
        setPreview(collegeLogo);
      }

      form.setValues({
        collegeCity,
        collegeName,
        collegeLogo,
        nameOfHOD: nameOfHOD ?? "",
        latitude,
        longitude,
      });
    }
  }, [data]);

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
          showDeleteButton={mode === "update"}
          initialPreview={preview}
          key={preview}
        />

        <MInput
          required
          variant="text"
          label="College Name"
          className={classes.fullGrid}
          value={form.values.collegeName}
          placeholder="Name of college"
          formHandler={form.getInputProps("collegeName")}
          disabled={mode === "edit"}
        />

        <MInput
          disabled={mode === "edit"}
          value={form.values.nameOfHOD}
          required
          variant="text"
          label="Name of HOD"
          placeholder="John Doe"
          formHandler={form.getInputProps("nameOfHOD")}
          className={classes.fullGrid}
        />

        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
          className={classes.fullGrid}
        >
          <MInput
            disabled={true}
            required
            value={form.values.collegeCity}
            variant="text"
            label="College City"
            placeholder="Indore"
            formHandler={form.getInputProps("collegeCity")}
          />

          <MInput
            value={String(form.values.latitude)}
            required
            variant="text"
            label="Latitude"
            placeholder="22.5"
            formHandler={form.getInputProps("latitude")}
            disabled={true}
          />

          <MInput
            value={String(form.values.longitude)}
            required
            variant="text"
            label="Longitude"
            disabled={true}
            placeholder="85.22"
            formHandler={form.getInputProps("longitude")}
          />
        </Box>

        {mode === "update" && (
          <MButton type="submit" text="Update" radius="md" variant="filled" />
        )}
        {mode === "edit" && (
          <MButton
            type="button"
            text="Edit"
            radius="md"
            variant="filled"
            handleClick={() => {
              setMode("update");
            }}
          />
        )}
      </form>
    </Box>
  );
};

export default memo(CollegeContainer);
