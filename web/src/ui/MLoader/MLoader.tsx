import React, { memo } from "react";
import { Center, Loader } from "@mantine/core";
import classes from "./index.module.scss";
interface IProps {
  className?: string;
  type: "bars" | "dots" | "oval";
  color?: string;
  size?: "md" | "lg" | "sm" | "xs" | "xl";
}

const MLoader: React.FC<IProps> = ({ type, className, color, size }) => {
  return (
    <Center className={className ?? classes.root}>
      <Loader color={color ?? "red"} type={type} size={size ?? "lg"} />
    </Center>
  );
};

export default memo(MLoader);
