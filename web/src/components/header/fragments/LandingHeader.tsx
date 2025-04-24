"use client";
import { ROUTES } from "@/enums/routes.enum";
import { useAppSelector } from "@/store/hooks";
import MButton from "@/ui/MButton/MButton";
import MImage from "@/ui/MImage/MImage";
import { Box } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo } from "react";
import { Typewriter } from "react-simple-typewriter";
import classes from "../styles/landing.module.scss";

const LandingHeader: React.FC = () => {
  const path = usePathname();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <Box className={classes.root}>
      <Link href={ROUTES.HOME} style={{ textDecoration: "none" }}>
        <Box className={classes.imageContainer}>
          <MImage alt="logo" name="logoBlack" width={110} height={35} />
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
      </Link>

      <Box className={classes.buttonContainer}>
        <Link
          href={ROUTES.CENTER}
          className={`${classes.link} ${
            path.includes(ROUTES.CENTER) ? classes.active : ""
          }`}
        >
          Centers
        </Link>
        <Link
          href={ROUTES.CALENDER}
          className={`${classes.link} ${
            path.includes(ROUTES.CALENDER) ? classes.active : ""
          }`}
        >
          Calender
        </Link>

        <Link href={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}>
          <MButton
            color="red"
            text={isAuthenticated ? "Go to ATC" : "Login"}
            textColor="white"
            variant="filled"
            radius="sm"
            className={classes.button}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default memo(LandingHeader);
