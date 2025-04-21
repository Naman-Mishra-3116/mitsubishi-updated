import { FileInputProps } from "@mantine/core";

export interface ImageCropPickerProps {
  formHandler: FileInputProps;
  label?: string;
  pickerRatio?: number;
  profileImage: string;
  multiple?: boolean;
}

export interface ICropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}
