"use client";
import MButton from "@/ui/MButton/MButton";
import MInput from "@/ui/MInput/MInput";
import MTypography from "@/ui/MTypography/MTypography";
import { Box, Flex } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { FormEvent, memo, useEffect, useState } from "react";

import classes from "../styles/profileForm.module.scss";
import { STATES } from "@/constants/states";
import {
  profileFormInitials,
  profileFormValidator,
} from "@/validation/profileForm.validator";
import { useGetProfileFromData } from "@/hooks/query/useGetProfileFormData.query";
import { useCompleteProfileForm } from "@/hooks/mutation/useCompleteProfileForm.mutation";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { notifications } from "@mantine/notifications";

interface IProps {}

const ProfileForm: React.FC<IProps> = () => {
  const [mode, setMode] = useState<"Edit" | "Update">("Edit");
  const form = useForm({
    initialValues: profileFormInitials,
    validate: yupResolver(profileFormValidator),
    validateInputOnChange: false,
    validateInputOnBlur: false,
  });

  const { data } = useGetProfileFromData();

  const { mutateAsync, isPending } = useCompleteProfileForm();

  const queryClient = useQueryClient();


  useEffect(() => {
    if (!data) {
      return;
    }
    if (data) {
      const {
        email,
        fullName,
        about = "",
        address = "",
        city = "",
        state = "",
        phoneNumber = "",
        postalCode = "",
      } = data.data;

      form.setFieldValue("about", about);
      form.setFieldValue("address", address);
      form.setFieldValue("phoneNumber", phoneNumber);
      form.setFieldValue("city", city);
      form.setFieldValue("email", email);
      form.setFieldValue("postalCode", postalCode);
      form.setFieldValue("state", state);
      form.setFieldValue("fullName", fullName);
    }
  }, [data]);

  const handleFormSubmit = async (
    values: typeof form.values,
    e?: FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();

    const resp = await mutateAsync({
      ...values,
    });

    if (resp.status === "success") {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ADMIN_PROFILE_DATA],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ADMIN_PROFILE_FORM],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ADMIN_PROFILE_VIEW],
      });

      setMode("Edit");
      notifications.show({
        title: resp.title,
        message: resp.message,
        color: "green",
      });
    } else if (resp.status === "error") {
      notifications.show({
        title: resp.title,
        message: resp.message,
        color: "red",
      });
    }
  };

  return (
    <Box className={classes.rootBox}>
      <Box className={classes.header}>
        <MTypography
          variant="heading"
          color="white"
          text="Edit Profile"
          className={classes.heading}
        />
        <MTypography
          className={classes.subHeading}
          variant="subTitle"
          text="Complete your profile"
          color="white"
        />
      </Box>
      <form
        className={classes.form}
        onSubmit={form.onSubmit(handleFormSubmit)}
        key={"123"}
      >
        <MInput
          required
          variant="text"
          label="Admin Type"
          value="Super Admin"
          disabled={true}
          formHandler={{}}
        />
        <MInput
          disabled={true}
          required
          variant="text"
          label="Company"
          placeholder="Mitsubishi"
          formHandler={{}}
        />
        <MInput
          required
          variant="text"
          label="Full Name"
          value={form.values.fullName}
          placeholder="Naman Mishra"
          formHandler={form.getInputProps("fullName")}
          disabled={mode === "Edit"}
        />
        <MInput
          required
          variant="text"
          label="Email"
          value={form.values.email}
          placeholder="abc@example.com"
          formHandler={form.getInputProps("email")}
          disabled={mode === "Edit"}
        />
        <MInput
          variant="text"
          label="Phone Number"
          value={form.values.phoneNumber}
          placeholder="0000000000"
          formHandler={form.getInputProps("phoneNumber")}
          disabled={mode === "Edit"}
          required
        />
        <MInput
          variant="text"
          label="City"
          value={form.values.city}
          placeholder="Indore"
          disabled={mode === "Edit"}
          formHandler={form.getInputProps("city")}
          required
        />
        <MInput
          required
          variant="select"
          label="State"
          value={form.values.state}
          placeholder="Madhya Pradesh"
          disabled={mode === "Edit"}
          formHandler={form.getInputProps("state")}
          data={STATES}
        />

        <MInput
          required
          variant="text"
          label="Postal Code"
          placeholder="101001"
          value={form.values.postalCode}
          disabled={mode === "Edit"}
          formHandler={form.getInputProps("postalCode")}
        />
        <MInput
          required
          variant="textarea"
          disabled={mode === "Edit"}
          label="Address"
          className={classes.fullGrid}
          value={form.values.address}
          placeholder="10 Racecourse Road, Indore, Madhya Pradesh"
          formHandler={form.getInputProps("address")}
        />

        <MInput
          required
          variant="textarea"
          disabled={mode === "Edit"}
          label="About"
          className={classes.fullGrid}
          value={form.values.about}
          formHandler={form.getInputProps("about")}
          placeholder="Believe in yourself..."
        />
        {mode === "Update" && (
          <Flex justify={"end"} mt={"20"} className={classes.fullGrid}>
            <MButton
              disabled={isPending ?? false}
              type="submit"
              text={mode}
              variant="filled"
              radius="xl"
              size="md"
              className={classes.button}
            />
          </Flex>
        )}
      </form>
      {mode === "Edit" && (
        <Flex justify={"end"} mt={"20"} className={classes.fullGrid}>
          <MButton
            type="button"
            text={mode}
            variant="filled"
            radius="xl"
            size="md"
            className={classes.button}
            handleClick={() => {
              setMode("Update");
            }}
          />
        </Flex>
      )}
    </Box>
  );
};

export default memo(ProfileForm);
