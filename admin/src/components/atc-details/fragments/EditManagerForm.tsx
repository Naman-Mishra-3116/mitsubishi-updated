"use client";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { useEditMangerByIdMutation } from "@/hooks/mutation/useEditManagerById.mutation";
import { useGetManagerByAtcID } from "@/hooks/query/useGetManagerByATCId.query";
import MButton from "@/ui/MButton/MButton";
import MInput from "@/ui/MInput/MInput";
import MTypography from "@/ui/MTypography/MTypography";
import {
  editManagerInitials,
  editManagerValidation,
} from "@/validation/editManager.validator";
import { Box } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import classes from "../styles/createATCForm.module.scss";

const EditManagerForm: React.FC = () => {
  const [mode, setMode] = useState<"edit" | "update">("edit");
  const { id } = useParams();
  const { data } = useGetManagerByAtcID(id as string);
  const [managerId, setManagerId] = useState("");
  const { mutateAsync } = useEditMangerByIdMutation();
  const queryCleint = useQueryClient();
  const form = useForm({
    initialValues: editManagerInitials,
    validate: yupResolver(editManagerValidation),
  });

  useEffect(() => {
    if (data && data.data) {
      const { managerEmail, managerName, phoneNumber, _id } = data.data;
      form.setValues({ managerName, managerEmail, phoneNumber });
      setManagerId(_id);
    }
  }, [data]);

  const handleSubmit = async (values: typeof form.values) => {
    if (managerId) {
      const resp = await mutateAsync({
        id: managerId,
        data: {
          managerName: values.managerName,
          managerEmail: values.managerEmail,
          managerPassword: values.managerPassword,
          phoneNumber: values.phoneNumber,
        },
      });

      if (resp.status === "success") {
        queryCleint.invalidateQueries({
          queryKey: [QUERY_KEY.GET_MANAGER_BY_ATC_ID],
        });
        setMode("edit");
      }
      notifications.show({
        message: resp.title,
        color: resp.status === "success" ? "green" : "red",
      });
    }
  };

  return (
    <Box className={classes.rootBox} mt={"xl"}>
      <Box className={classes.header}>
        <MTypography
          variant="heading"
          color="white"
          text="Edit Manager"
          className={classes.heading}
        />
        <MTypography
          className={classes.subHeading}
          variant="subTitle"
          text="Edit Manager Details"
          color="white"
        />
      </Box>

      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <MInput
          required
          disabled={mode === "edit"}
          variant="text"
          label="Manager Name"
          placeholder="John Doe"
          value={form.values.managerName}
          formHandler={form.getInputProps("managerName")}
        />

        <MInput
          required
          disabled={mode === "edit"}
          value={form.values.managerEmail}
          variant="text"
          label="Manager Email"
          placeholder="manager@gmail.com"
          formHandler={form.getInputProps("managerEmail")}
        />

        <MInput
          required
          disabled={mode === "edit"}
          value={form.values.phoneNumber}
          variant="text"
          label="Manger Contact Number"
          placeholder="0000000000"
          formHandler={form.getInputProps("phoneNumber")}
        />

        <MInput
          required
          disabled={mode === "edit"}
          variant="password"
          label="New Password"
          value={form.values.managerPassword}
          placeholder="abc@123"
          formHandler={form.getInputProps("managerPassword")}
        />

        {mode === "update" && (
          <>
            <MButton
              handleClick={() => {
                setMode("edit");
              }}
              type="button"
              text="Cancel"
              radius="md"
              textColor="red"
              variant="outline"
            />
            <MButton type="submit" text="Update" radius="md" variant="filled" />
          </>
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

export default memo(EditManagerForm);
