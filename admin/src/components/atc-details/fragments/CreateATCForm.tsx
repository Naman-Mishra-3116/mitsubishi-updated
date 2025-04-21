import MTypography from "@/ui/MTypography/MTypography";
import { Box } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React, { memo } from "react";
import classes from "../styles/createATCForm.module.scss";
import MImageInput from "@/ui/MInput/MImageInput";
import MInput from "@/ui/MInput/MInput";
import { STATES } from "@/constants/states";
import MButton from "@/ui/MButton/MButton";
import { createATCIntials } from "@/validation/createAtc.validator";

interface IProps {
  form: UseFormReturnType<typeof createATCIntials>;
  handleSaveFile: (file: File) => void;
  handleSubmit: () => void;
  showPreview: boolean;
}

const CreateATCForm: React.FC<IProps> = ({
  form,
  handleSaveFile,
  handleSubmit,
  showPreview,
}) => {
  return (
    <Box className={classes.rootBox}>
      <Box className={classes.header}>
        <MTypography
          variant="heading"
          color="white"
          text="Create ATC"
          className={classes.heading}
        />
        <MTypography
          className={classes.subHeading}
          variant="subTitle"
          text="Create new Authorized Training Center"
          color="white"
        />
      </Box>

      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <MImageInput
          cropShape="rect"
          label="ATC Image"
          handleFormSave={handleSaveFile}
          className={classes.file}
          aspectRatio={2 / 1}
          error={form.errors.atcImage as string}
        />

        <MInput
          required
          variant="text"
          label="ATC Name"
          placeholder="Indore ATC"
          formHandler={form.getInputProps("atcName")}
        />

        <MInput
          required
          variant="text"
          label="College Name"
          placeholder="Name of college"
          formHandler={form.getInputProps("collegeName")}
        />

        <MInput
          required
          variant="text"
          label="ATC Manager Name"
          placeholder="John Doe"
          formHandler={form.getInputProps("managerName")}
        />

        <MInput
          required
          variant="text"
          label="ATC Manager Email"
          placeholder="manager@gmail.com"
          formHandler={form.getInputProps("managerEmail")}
        />

        <MInput
          required
          variant="password"
          label="ATC Manager Password"
          placeholder="**********"
          formHandler={form.getInputProps("managerPassword")}
        />

        <MInput
          required
          variant="text"
          label="ATC Manager Contact"
          placeholder="0000000000"
          formHandler={form.getInputProps("phoneNumber")}
        />

        <MInput
          required
          variant="text"
          label="ATC City"
          placeholder="Indore"
          formHandler={form.getInputProps("city")}
        />

        <MInput
          required
          variant="select"
          label="ATC State"
          placeholder="Some state"
          formHandler={form.getInputProps("state")}
          data={STATES}
        />

        <MInput
          required
          variant="textarea"
          label="ATC Description"
          placeholder="Write some description about the ATC"
          formHandler={form.getInputProps("description")}
        />
        <MInput
          required
          variant="textarea"
          label="ATC Address"
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

export default memo(CreateATCForm);
