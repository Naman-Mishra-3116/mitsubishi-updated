import {
  FileInput,
  FileInputProps,
  NativeSelectProps,
  NumberInput,
  NumberInputProps,
  PasswordInput,
  PasswordInputProps,
  Select,
  SelectProps,
  Textarea,
  TextareaProps,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import React, { memo } from "react";
import classes from "./index.module.scss";

interface BaseProps<
  T extends "file" | "select" | Exclude<IProps["variant"], "file" | "select">
> {
  value?: string;
  variant: T;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  formHandler: Partial<
    TextInputProps &
      TextareaProps &
      PasswordInputProps &
      FileInputProps &
      NumberInputProps &
      NativeSelectProps
  >;
}

type IProps =
  | (BaseProps<"file"> & { accept: string })
  | (BaseProps<"select"> & { data: string[] })
  | BaseProps<
      Exclude<
        "text" | "password" | "number" | "textarea",
        "file" | "select" | "date"
      >
    >;

const MInput: React.FC<IProps> = ({
  value,
  variant,
  placeholder,
  className,
  formHandler,
  label,
  required = false,
  disabled = false,
  ...rest
}) => {
  const commonProps = {
    withAsterisk: required,
    placeholder,
    className,
    label,
    disabled,
    classNames: {
      input: classes.input,
    },
  };

  switch (variant) {
    case "text":
      return (
        <TextInput
          {...commonProps}
          {...(formHandler as TextInputProps)}
          value={value}
        />
      );
    case "password":
      return (
        <PasswordInput
          {...commonProps}
          classNames={{
            input: classes.input,
          }}
          {...(formHandler as PasswordInputProps)}
          value={value}
        />
      );
    case "number":
      return (
        <NumberInput
          {...commonProps}
          {...(formHandler as NumberInputProps)}
          value={value}
        />
      );
    case "textarea":
      return (
        <Textarea
          {...commonProps}
          minRows={3}
          maxRows={10}
          autosize
          {...(formHandler as TextareaProps)}
          value={value}
        />
      );
    case "file":
      return (
        <FileInput
          clearable
          {...commonProps}
          {...(formHandler as FileInputProps)}
          accept={(rest as { accept: string }).accept}
        />
      );
    case "select":
      return (
        <Select
          searchable
          {...commonProps}
          {...(formHandler as SelectProps)}
          maxDropdownHeight={150}
          data={(rest as { data: string[] }).data}
        />
      );
    default:
      return (
        <TextInput
          {...commonProps}
          {...(formHandler as TextInputProps)}
          value={value}
        />
      );
  }
};

export default memo(MInput);
