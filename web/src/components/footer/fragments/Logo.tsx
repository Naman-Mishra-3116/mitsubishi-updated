import MImage from "@/ui/MImage/MImage";
import MTypography from "@/ui/MTypography/MTypography";
import { Box } from "@mantine/core";
import { memo } from "react";
import classes from "../style/logo.module.scss";
const Logo = () => {
  return (
    <Box className={classes.root}>
      <MImage alt="mitsubishi logo" name="logoBlack" width={120} height={40} />
      <MTypography
        text={`© ${new Date().getFullYear()} Mitsubishi Electric - All rights Reserved`}
        variant="descriptionMedium"
        className={classes.text}
      />
    </Box>
  );
};

export default memo(Logo);
