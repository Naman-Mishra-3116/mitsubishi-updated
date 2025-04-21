import MTypography from "@/ui/MTypography/MTypography";
import { Box } from "@mantine/core";
import React, { memo } from "react";
import classes from "../style/connectus.module.scss";
import SocialMedia from "./SocialMedia";

const ConnectWithUs = () => {
  return (
    <Box className={classes.root}>
      <MTypography
        text="Connect with us."
        variant="descriptionMedium"
        fontWeight={500}
        className={classes.text}
      />
      <SocialMedia />
    </Box>
  );
};

export default memo(ConnectWithUs);
