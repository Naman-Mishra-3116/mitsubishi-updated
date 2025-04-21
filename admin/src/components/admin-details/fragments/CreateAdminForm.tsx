"use client";
import { STATES } from "@/constants/states";
import MButton from "@/ui/MButton/MButton";
import MImageInput from "@/ui/MInput/MImageInput";
import MInput from "@/ui/MInput/MInput";
import MTypography from "@/ui/MTypography/MTypography";
import { createAdminInital } from "@/validation/createAdmin.validator";
import { Box } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React, { memo } from "react";
import classes from "../styles/createAdminForm.module.scss";

interface IProps {
  showPreview: boolean;
  form: UseFormReturnType<typeof createAdminInital>;
  handleSubmit: () => void;
  handleSaveFile: (file: File) => void;
}

const CreateAdminForm: React.FC<IProps> = ({
  showPreview,
  form,
  handleSubmit,
  handleSaveFile,
}) => {
  return (
    <Box className={classes.rootBox}>
      <Box className={classes.header}>
        <MTypography
          variant="heading"
          color="white"
          text="Create Admin"
          className={classes.heading}
        />
        <MTypography
          className={classes.subHeading}
          variant="subTitle"
          text="Create new admin"
          color="white"
        />
      </Box>

      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <MImageInput
          cropShape="round"
          label="Profile Image"
          handleFormSave={handleSaveFile}
          className={classes.file}
        />
        <MInput
          required
          placeholder="Select Admin type"
          variant="select"
          label="Admin Type"
          formHandler={form.getInputProps("adminType")}
          data={["Super Admin", "Sub Admin"]}
        />
        <MInput
          required
          variant="select"
          data={["READ", "WRITE"]}
          label="Permission"
          placeholder="Select Permission"
          formHandler={form.getInputProps("permission")}
        />

        <MInput
          required
          variant="text"
          label="Email"
          placeholder="abc@mitsubishi.com"
          formHandler={form.getInputProps("email")}
        />

        <MInput
          required
          variant="password"
          label="Password"
          placeholder="**********"
          formHandler={form.getInputProps("password")}
        />

        <MInput
          required
          variant="text"
          label="Full Name"
          placeholder="Naman Mishra"
          formHandler={form.getInputProps("fullName")}
        />

        <MInput
          required
          variant="text"
          label="Phone Number"
          placeholder="0000000000"
          formHandler={form.getInputProps("phoneNumber")}
        />

        <MInput
          variant="text"
          label="City"
          placeholder="Indore"
          formHandler={form.getInputProps("city")}
        />

        <MInput
          variant="select"
          label="State"
          placeholder="Madhya Pradesh"
          formHandler={form.getInputProps("state")}
          data={STATES}
        />

        <MInput
          variant="textarea"
          label="About"
          placeholder="Write something about the admin.."
          formHandler={form.getInputProps("about")}
        />
        <MInput
          variant="textarea"
          label="Address"
          placeholder="New York City, America"
          formHandler={form.getInputProps("address")}
        />
        {!showPreview && (
          <MButton
            type="button"
            text="Submit"
            radius="md"
            variant="filled"
            handleClick={handleSubmit}
          />
        )}
      </form>
    </Box>
  );
};

export default memo(CreateAdminForm);
