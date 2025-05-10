import { Center, Flex, Loader } from "@mantine/core";
import React, { memo } from "react";
import MTypography from "../MTypography/MTypography";
import classes from "./index.module.scss";
interface IProps {
  className?: string;
  type: "bars" | "dots" | "oval";
  color?: string;
  size?: "md" | "lg" | "sm" | "xs" | "xl";
  message?: string;
}

const MLoader: React.FC<IProps> = ({
  type,
  className,
  color,
  size,
  message,
}) => {
  return (
    <Center className={className ?? classes.root}>
      <Flex direction="column" align="center" gap={8}>
        {message && <MTypography text={message} variant="descriptionMedium" />}
        <Loader color={color ?? "red"} type={type} size={size ?? "lg"} />
      </Flex>
    </Center>
  );
};

export default memo(MLoader);
