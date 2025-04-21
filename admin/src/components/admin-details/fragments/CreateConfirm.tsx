import MButton from "@/ui/MButton/MButton";
import MImage from "@/ui/MImage/MImage";
import MTypography from "@/ui/MTypography/MTypography";
import { createAdminInital } from "@/validation/createAdmin.validator";
import { Box, Flex } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React, { memo } from "react";
import { tileData } from "../data";
import classes from "../styles/createConfirm.module.scss";
import ConfirmTile from "./ConfirmTile";

interface IProps {
  onClickCancel: () => void;
  form: UseFormReturnType<typeof createAdminInital>;
  profilePreview: string;
  handleSubmit: (values: typeof createAdminInital) => void;
}

const CreateConfirm: React.FC<IProps> = ({
  onClickCancel,
  form,
  handleSubmit,
  profilePreview,
}) => {
  return (
    <div className={classes.container}>
      <Box className={classes.profileContainer}>
        {profilePreview && (
          <MImage
            url={profilePreview}
            name={!profilePreview ? "profileDemo" : undefined}
            alt="Profile Pic of admin"
            className={classes.image}
            width={250}
            height={250}
          />
        )}
        <Box className={classes.profileBox}>
          <MTypography
            variant="descriptionMedium"
            text={form.values.fullName}
            fontWeight={"bolder"}
          />
          <MTypography
            variant="normal"
            text={form.values.email}
            className={classes.email}
            fontWeight={"bolder"}
          />
          <MTypography variant="normal" text={form.values.adminType} />
        </Box>
      </Box>
      <Box className={classes.aboutMeSection}>
        {tileData.map((tile) => {
          const value = form.values?.[tile.key as keyof typeof form.values];
          if (Boolean(value)) {
            return (
              <ConfirmTile
                key={tile.key}
                Icon={tile.tablerIcon}
                title={tile.title}
                value={value as string}
              />
            );
          }
          return null;
        })}
      </Box>
      <Flex gap={"sm"}>
        <MButton
          text="Cancel"
          variant="filled"
          radius="xs"
          className={classes.button}
          handleClick={onClickCancel}
        />
        <MButton
          text="Confirm"
          variant="filled"
          radius="xs"
          className={classes.button}
          handleClick={() => {
            form.onSubmit(handleSubmit)();
          }}
        />
      </Flex>
    </div>
  );
};

export default memo(CreateConfirm);
