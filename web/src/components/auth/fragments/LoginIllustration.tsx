"use client";
import { Box, Center } from "@mantine/core";
import React, { memo } from "react";
import classes from "../styles/loginillustration.module.scss";
import { Typewriter } from "react-simple-typewriter";
import MImage from "@/ui/MImage/MImage";
import { useMediaQuery } from "@mantine/hooks";

const LoginIllustration: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width:500px)");
  return isSmallScreen ? (
    <></>
  ) : (
    <Center className={classes.center}>
      <Box className={classes.box}>
        <MImage
          name="logoBlack"
          alt="logo"
          width={290}
          height={150}
          className={classes.image}
        />
        <span className={classes.spanStyle}>
          <Typewriter
            words={["Changes for the better!"]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={50}
            delaySpeed={3000}
          />
        </span>
      </Box>
    </Center>
  );
};

export default memo(LoginIllustration);
