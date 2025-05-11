import MImage from "@/ui/MImage/MImage";
import MLayout from "@/ui/MLayout/MLayout";
import MTypography from "@/ui/MTypography/MTypography";
import { Box } from "@mantine/core";
import React, { memo } from "react";
import classes from "../styles/index.module.scss";

const HeroSection: React.FC = () => {
  return (
    <MLayout>
      <Box className={classes.root}>
        <Box className={classes.left}>
          <MTypography
            variant="heading"
            text="Mitsubishi Electric Authorized Training Centers"
            className={classes.heading}
          />
          <MTypography
            className={classes.desc}
            variant="description"
            text="Mitsubishi Electric India Authorized Training Centers empower individuals with industry-leading training in advanced automation and cutting-edge technologies."
          />
        </Box>
        <Box className={`${classes.right} ${classes.animate}`}>
          <MImage
            alt="mitsubishi demonstration"
            name="hero"
            className={classes.image}
          />
        </Box>
      </Box>
    </MLayout>
  );
};

export default memo(HeroSection);
