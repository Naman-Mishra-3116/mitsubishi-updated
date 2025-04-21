"use client";
import { Button } from "@mantine/core";
import React, { memo } from "react";

interface IProps {
  disabled?: boolean;
  type?: "submit" | "button";
  text: string;
  handleClick?: () => void;
  href?: string;
  className?: string;
  color?: string;
  radius?: "sm" | "md" | "lg" | "xs" | "xl";
  variant:
    | "default"
    | "subtle"
    | "transparent"
    | "filled"
    | "fullwidth"
    | "outline";
  size?: "md" | "lg" | "sm" | "xsm" | "xl";
  p?: string;
  m?: string;
  textColor?: string;
  children?: React.ReactNode;
}

const MButton: React.FC<IProps> = ({
  m,
  p,
  text,
  handleClick,
  href,
  className,
  size = "md",
  color,
  textColor = "white",
  variant,
  children,
  type = "button",
  radius,
  disabled,
}) => {
  const style = {
    background:
      variant === "transparent"
        ? "transparent"
        : variant === "outline"
        ? "transparent"
        : color ?? "#d71a18",
    margin: m ?? 0,
    padding: p ?? 0,
    color: textColor,
    border: variant === "outline" ? "1px solid #d71a18" : "",
  };
  return (
    <Button
      disabled={disabled}
      type={type}
      variant={variant}
      size={size}
      onClick={handleClick}
      component={href ? "a" : "button"}
      href={href ?? undefined}
      className={`${className}`}
      style={style}
      ff="Roboto"
      aria-label="button"
      radius={radius}
    >
      {children ?? text}
    </Button>
  );
};

export default memo(MButton);
