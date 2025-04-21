import React, { memo } from "react";
import classes from "../styles/loginContainer.module.scss";
import { Box } from "@mantine/core";
import LoginForm from "./LoginForm";
import LoginIllustration from "./LoginIllustration";

interface IProps {}

const LoginContainer: React.FC<IProps> = () => {
  return (
    <Box className={classes.root}>
      <LoginForm />
      <LoginIllustration />
    </Box>
  );
};

export default memo(LoginContainer);
