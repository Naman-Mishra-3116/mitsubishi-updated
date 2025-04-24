"use client";
import MButton from "@/ui/MButton/MButton";
import openImageCropperModal from "@/ui/MImageCropper/fragments/openCropperModal";
import MInput from "@/ui/MInput/MInput";
import MTypography from "@/ui/MTypography/MTypography";
import { ActionIcon, Box, Group, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import { useForm, yupResolver } from "@mantine/form";
import { IconCrop, IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import Image from "next/image";
import React, { memo } from "react";
import classes from "../styles/index.module.scss";
import {
  createTrainingInitails,
  trainingFormSchema,
  validateExcelColumns,
} from "@/validation/createTrainingValidator";
import { notifications } from "@mantine/notifications";

type FormValues = {
  title: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  attendence: File | null;
  totalStudents: number;
  trainingImages: File[];
};

const CreateTrainingForm: React.FC = () => {
  const form = useForm<FormValues>({
    initialValues: createTrainingInitails,
    validate: yupResolver(trainingFormSchema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    const isExcelValid = await validateExcelColumns(values.attendence);
    if (!isExcelValid) {
      form.setFieldError(
        "attendence",
        "The Excel file should contain Name, RollNumber, Email, TotalAttendance, Feedback"
      );
      notifications.show({
        title: "Invalid Structure for attendence file",
        color: "blue",
        message:
          "The Excel file should contain Name, RollNumber, Email, TotalAttendance,Feedback",
      });
      return;
    }
    console.log(values);
  };

  const handleDrop = (files: File[]) => {
    const newFiles = files.slice(0, 5 - form.values.trainingImages.length);
    form.setFieldValue("trainingImages", [
      ...form.values.trainingImages,
      ...newFiles,
    ]);
  };

  const removeFile = (index: number) => {
    const updated = [...form.values.trainingImages];
    updated.splice(index, 1);
    form.setFieldValue("trainingImages", updated);
  };
  return (
    <Box className={classes.rootBox}>
      <Box className={classes.header}>
        <MTypography
          variant="heading"
          color="white"
          text="Create Training"
          className={classes.heading}
        />
        <MTypography
          className={classes.subHeading}
          variant="subTitle"
          text=""
          color="white"
        />
      </Box>

      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <MInput
          required
          variant="text"
          label="Training title"
          className={classes.fullGrid}
          placeholder="Example title"
          formHandler={form.getInputProps("title")}
        />

        <MInput
          required
          variant="textarea"
          label="Training Description"
          placeholder="Example Training description"
          formHandler={form.getInputProps("description")}
          className={classes.fullGrid}
        />

        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
          className={classes.fullGrid}
        >
          <DatePickerInput
            withAsterisk
            {...form.getInputProps("startDate")}
            label="Start Date"
            placeholder="6th November 2024"
            classNames={{
              input: classes.input,
            }}
          />

          <DatePickerInput
            {...form.getInputProps("endDate")}
            withAsterisk
            label="End Date"
            placeholder="7th October 2024"
            classNames={{
              input: classes.input,
            }}
          />

          <MInput
            required
            variant="text"
            label="Total Students"
            placeholder="55"
            formHandler={form.getInputProps("totalStudents")}
          />
        </Box>
        <MInput
          placeholder="XlSX file containing attendence"
          accept="xlsx"
          required
          variant="file"
          className={classes.fullGrid}
          label="Attendance File"
          formHandler={form.getInputProps("attendence")}
        />
        <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Text mt={"10px"} size="14px">
            Training Images <span style={{ color: "red" }}>*</span>
          </Text>
          <Text mt={"-10px"} c={"red"} size="12px">
            {form.errors.trainingImages}
          </Text>
        </Box>

        {form.values.trainingImages.length < 5 && (
          <Dropzone
            mt={"-10"}
            onDrop={handleDrop}
            onReject={(files) => console.log("rejected", files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            className={classes.fullGrid}
          >
            <Group
              justify="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  size={52}
                  color="var(--mantine-color-blue-6)"
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size={52}
                  color="var(--mantine-color-red-6)"
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  size={52}
                  color="var(--mantine-color-dimmed)"
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Maximum 5 images, each under 5MB.
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}
        <Group mt="md" wrap="wrap" className={classes.fullGrid}>
          {form.values.trainingImages.map((file, index) => (
            <Box
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                width: "130px",
                textAlign: "center",
              }}
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                height={100}
                width={100}
              />
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "8px",
                  width: "100%",
                }}
              >
                <ActionIcon
                  w={"50%"}
                  variant="light"
                  color="red"
                  onClick={() => removeFile(index)}
                >
                  <IconX size={14} />
                </ActionIcon>
                <ActionIcon
                  w={"50%"}
                  variant="light"
                  color="blue"
                  onClick={() =>
                    openImageCropperModal(
                      form.values.trainingImages[index],
                      (croppedImage) => {
                        if (!croppedImage) return;
                        const updated = [...form.values.trainingImages];
                        updated[index] = croppedImage as File;
                        form.setFieldValue("trainingImages", updated);
                      },
                      "rect",
                      16 / 9
                    )
                  }
                >
                  <IconCrop size={14} />
                </ActionIcon>
              </Box>
            </Box>
          ))}
        </Group>

        <MButton type="submit" text="Update" radius="md" variant="filled" />
      </form>
    </Box>
  );
};

export default memo(CreateTrainingForm);
