import { createATCIntials } from "@/validation/createAtc.validator";
import { UseFormReturnType } from "@mantine/form";
import React, { memo } from "react";
import classes from "../styles/createConfirm.module.scss";
import { Box, Flex } from "@mantine/core";
import MButton from "@/ui/MButton/MButton";
import MTypography from "@/ui/MTypography/MTypography";
import MImage from "@/ui/MImage/MImage";
import { tileData } from "../data";
import ConfirmTile from "@/components/admin-details/fragments/ConfirmTile";

interface IProps {
  atcImagePreview: string;
  form: UseFormReturnType<typeof createATCIntials>;
  onClickCancel: () => void;
  handleSubmit: (values: typeof createATCIntials) => void;
}

const CreateATCConfirm: React.FC<IProps> = ({
  onClickCancel,
  form,
  atcImagePreview,
  handleSubmit,
}) => {
  return (
    <div className={classes.container}>
      <Box>
        {atcImagePreview && (
          <MImage
            url={atcImagePreview}
            name={!atcImagePreview ? "profileDemo" : undefined}
            alt="ATC Image"
            width={300}
            height={200}
            className={classes.atcImage}
          />
        )}
      </Box>
      <Box className={classes.profileContainer}>
        <Box className={classes.profileBox}>
          <MTypography
            variant="descriptionMedium"
            text={form.values.atcName}
            className={classes.name}
            fontWeight={"bolder"}
          />
          <MTypography
            variant="normal"
            text={form.values.description}
            className={classes.description}
            fontWeight={"lighter"}
          />
        </Box>
      </Box>
      <Box className={classes.tileSection}>
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

export default memo(CreateATCConfirm);
