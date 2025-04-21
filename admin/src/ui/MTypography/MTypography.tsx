import React, { ReactNode, memo } from "react";
import classes from "./index.module.scss";

interface IProps {
  fontSize?: string;
  variant:
    | "heading"
    | "subHeading"
    | "description"
    | "subTitle"
    | "descriptionMedium"
    | "normal"
    | "imgtext";
  text?: string;
  children?: ReactNode;
  color?: string;
  align?:
    | "center"
    | "end"
    | "inherit"
    | "initial"
    | "justify"
    | "left"
    | "right"
    | "start";
  fontWeight?: "bold" | "bolder" | "lighter" | number;
  fontFamily?: string;
  textTransform?: "uppercase" | "capitalize" | "lowercase";
  margin?: number | string;
  className?: string;
}

const FTypography = (props: IProps) => {
  const {
    variant,
    text,
    color = "black",
    align,
    fontWeight,
    fontFamily,
    textTransform,
    children,
    margin,
    className,
    fontSize,
  } = props;

  const commonProps = {
    className: `${classes.default} ${classes[variant]} ${className ?? ""}`,
    style: {
      fontSize: fontSize,
      color: color ?? "#2a2c37",
      textAlign: align,
      fontWeight: fontWeight,
      fontFamily: fontFamily,
      textTransform: textTransform,
      margin: margin,
    },
  };

  const tagMap = {
    heading: "h2",
    subHeading: "h2",
    title: "h2",
    regularText: "h2",
    description: "p",
    descriptionMedium: "p",
    lightText: "p",
    date: "h4",
    subTitle: "h3",
    normal: "p",
    imgtext: "p",
  };
  const Tag = tagMap[variant] || "div";

  return React.createElement(Tag, commonProps, text ?? children);
};

export default memo(FTypography);
