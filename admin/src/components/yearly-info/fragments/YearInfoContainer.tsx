"use client";
import { PERMISSION } from "@/enums/permission.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { useAddYearlyInfo } from "@/hooks/mutation/useAddYearlyInfo.mutation";
import { useGetYearlyInfo } from "@/hooks/query/useGetYearlyInfo.query";
import { useAppSelector } from "@/store/hooks";
import MButton from "@/ui/MButton/MButton";
import MImageInput from "@/ui/MInput/MImageInput";
import MInput from "@/ui/MInput/MInput";
import MTypography from "@/ui/MTypography/MTypography";
import {
  yearFormValidator,
  YearlyInfo,
  yearlyInfoFormInital,
} from "@/validation/yearInfo.validator";
import { Box } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import React, { memo, useEffect, useState } from "react";
import classes from "../styles/index.module.scss";

const YearInfoContainer: React.FC = () => {
  const { mutateAsync } = useAddYearlyInfo();
  const [mode, setMode] = useState<"edit" | "update">("edit");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState("");
  const { data } = useGetYearlyInfo();
  const queryClient = useQueryClient();
  const permission = useAppSelector((state) => state.auth.user.permission);
  const form = useForm<YearlyInfo>({
    initialValues: yearlyInfoFormInital,
    validate: yupResolver(yearFormValidator),
  });

  useEffect(() => {
    if (data && data.data) {
      const { name, designation, signature, email, calendarLink } = data.data;
      setPreview(signature);

      form.setValues({
        name: name ?? "",
        designation: designation ?? "",
        email: email ?? "",
        signaturePreview: signature ?? "",
        calendarPreview: calendarLink ?? "",
      });
    }
  }, [data]);

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values.calendar);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("designation", values.designation);
    formData.append("calendar", values.calendar as File);

    if (file) {
      formData.append("signature", file);
    }

    const resp = await mutateAsync(formData);
    if (resp.status === "success") {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_YEARLY_INFO] });
      setMode("edit");
    }

    notifications.show({
      title: resp.title,
      message: resp.message,
      color: resp.status === "success" ? "green" : "red",
    });
  };

  return (
    <Box className={classes.rootBox} mt={"xl"} key={mode}>
      <Box className={classes.header}>
        <MTypography
          variant="heading"
          color="white"
          text={`${
            permission === PERMISSION.WRITE ? "Edit" : "View"
          } Yearly Information`}
          className={classes.heading}
        />
        <MTypography
          className={classes.subHeading}
          variant="subTitle"
          text={`${
            permission === PERMISSION.WRITE ? "Edit" : "View"
          } Yearly Details and year calendar`}
          color="white"
        />
      </Box>

      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <MImageInput
          showDeleteButton={mode === "update"}
          key={preview}
          initialPreview={preview}
          cropShape="rect"
          label="Signature of Head"
          handleFormSave={(file) => {
            form.setFieldValue("signature", file);
            setFile(file);
          }}
          className={classes.file}
          aspectRatio={2 / 1}
          error={form?.errors?.signature as string}
        />

        <MInput
          required
          disabled={mode === "edit"}
          variant="text"
          label="Name of Mitsubishi Head"
          placeholder="Mr. John Doe"
          value={form.values.name}
          formHandler={form.getInputProps("name")}
        />

        <MInput
          required
          disabled={mode === "edit"}
          variant="text"
          label="Email of Mitsubishi Head"
          placeholder="email@example.com"
          value={form.values.email}
          formHandler={form.getInputProps("email")}
        />

        <MInput
          required
          disabled={mode === "edit"}
          value={form.values.designation}
          variant="text"
          label="Designation"
          placeholder="Head of Mitsubishi"
          formHandler={form.getInputProps("designation")}
        />

        <MInput
          accept="application/pdf"
          required
          disabled={mode === "edit"}
          variant="file"
          label="Yearly Calendar"
          value={"Yearly Calender of this Year"}
          placeholder="Calender ( PDF FILE ONLY )"
          formHandler={form.getInputProps("calendar")}
        />

        {mode === "update" && (
          <MButton type="submit" text="Update" radius="md" variant="filled" />
        )}
        {mode === "edit" && permission === PERMISSION.WRITE && (
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

export default memo(YearInfoContainer);
