"use client";
import { STATES } from "@/constants/states";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { useEditATC } from "@/hooks/mutation/useEditATC.muatation";
import { useGetATCById } from "@/hooks/query/useGetATCById.query";
import MButton from "@/ui/MButton/MButton";
import MImageInput from "@/ui/MInput/MImageInput";
import MInput from "@/ui/MInput/MInput";
import MTypography from "@/ui/MTypography/MTypography";
import {
  editATCInitials,
  validateEditATC,
} from "@/validation/editATC.validator";
import { Box } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import classes from "../styles/createATCForm.module.scss";
import { useAppSelector } from "@/store/hooks";
import { PERMISSION } from "@/enums/permission.enum";

const EditATCForm: React.FC = () => {
  const { id } = useParams();
  const [mode, setMode] = useState<"edit" | "update">("edit");
  const [file, setFile] = useState<File | undefined>(undefined);
  const { data } = useGetATCById(id as string);
  const [preview, setPreview] = useState("");
  const queryClient = useQueryClient();
  const permission = useAppSelector((state) => state.auth.user.permission);
  const form = useForm({
    initialValues: editATCInitials,
    validate: yupResolver(validateEditATC),
  });

  const { mutateAsync } = useEditATC();

  useEffect(() => {
    if (data && data.data) {
      const {
        atcName,
        address,
        description,
        city,
        state,
        atcImage,
        collegeName,
      } = data.data;
      setPreview(atcImage);

      form.setValues({
        address,
        atcName,
        city,
        state,
        description,
        collegeName,
      });
    }
  }, [data]);

  const handleSubmit = async (values: typeof form.values) => {
    const formData = new FormData();
    formData.append("atcName", values.atcName);
    formData.append("address", values.address);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("description", values.description);
    formData.append("collegeName", values.collegeName);
    if (file) {
      formData.append("atcImage", file);
    }

    const resp = await mutateAsync({
      id: id as string,
      data: formData,
    });

    if (resp.status === "success") {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ATC_ID] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_ATC] });
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
          text={`${permission === PERMISSION.WRITE ? "Edit" : "View"} ATC`}
          className={classes.heading}
        />
        <MTypography
          className={classes.subHeading}
          variant="subTitle"
          text={`${
            permission === PERMISSION.WRITE ? "Edit" : "View"
          } ATC Details`}
          color="white"
        />
      </Box>

      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <MImageInput
          showDeleteButton={mode === "update"}
          key={preview}
          initialPreview={preview}
          cropShape="rect"
          label="ATC Image"
          handleFormSave={(file) => {
            setFile(file);
          }}
          className={classes.file}
          aspectRatio={2 / 1}
        />

        <MInput
          required
          disabled={mode === "edit"}
          variant="text"
          label="ATC Name"
          placeholder="Indore ATC"
          value={form.values.atcName}
          formHandler={form.getInputProps("atcName")}
        />

        <MInput
          required
          disabled={mode === "edit"}
          variant="text"
          label="College Name"
          placeholder="Example college of technology"
          value={form.values.collegeName}
          formHandler={form.getInputProps("collegeName")}
        />

        <MInput
          required
          disabled={mode === "edit"}
          value={form.values.city}
          variant="text"
          label="ATC City"
          placeholder="Indore"
          formHandler={form.getInputProps("city")}
        />

        <MInput
          required
          disabled={mode === "edit"}
          variant="select"
          label="ATC State"
          value={form.values.state}
          placeholder="Some state"
          formHandler={form.getInputProps("state")}
          data={STATES}
        />

        <MInput
          required
          disabled={mode === "edit"}
          value={form.values.description}
          variant="textarea"
          label="ATC Description"
          placeholder="Write some description about the ATC"
          formHandler={form.getInputProps("description")}
        />
        <MInput
          required
          disabled={mode === "edit"}
          value={form.values.address}
          variant="textarea"
          label="ATC Address"
          placeholder="New York City, America"
          formHandler={form.getInputProps("address")}
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

export default memo(EditATCForm);
