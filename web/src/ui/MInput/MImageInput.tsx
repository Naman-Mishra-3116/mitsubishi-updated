"use client";
import {
  ActionIcon,
  Button,
  FileButton,
  Flex,
  Group,
  Text,
} from "@mantine/core";
import { IconTrash, IconUpload } from "@tabler/icons-react";
import React, { memo, useEffect, useState } from "react";
import MImage from "../MImage/MImage";
import openImageCropperModal from "../MImageCropper/fragments/openCropperModal";

interface IProps {
  showDeleteButton?: boolean;
  className?: string;
  label: string;
  cropShape: "rect" | "round";
  handleFormSave: (file: File) => void;
  aspectRatio?: number;
  initialPreview?: string;
  error?: string;
}

const MImageInput: React.FC<IProps> = ({
  className,
  label,
  cropShape,
  handleFormSave,
  error,
  aspectRatio,
  initialPreview,
  showDeleteButton = true,
}) => {
  const [file, setFile] = useState<File | undefined>();
  const [croppedFile, setCroppedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>(initialPreview);

  useEffect(() => {
    if (file) {
      openImageCropperModal(file, setCroppedFile, cropShape, aspectRatio);
    }
  }, [file, aspectRatio, cropShape]);

  useEffect(() => {
    if (croppedFile) {
      const objectUrl = URL.createObjectURL(croppedFile);
      setPreview(objectUrl);
      handleFormSave(croppedFile);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [croppedFile, handleFormSave]);

  const handleClickDelete = () => {
    setFile(undefined);
    setCroppedFile(undefined);
    setPreview(undefined);
  };

  return (
    <Group className={className}>
      <Flex direction={"column"} gap={"5"}>
        <Text ff={"Roboto"} c={error ? "red" : "black"}>
          {label}
        </Text>
        {preview ? (
          <Flex pos={"relative"}>
            <MImage
              style={{ borderRadius: "4px" }}
              url={preview}
              alt="Cropped Image"
              height={100}
              width={100}
            />
            {showDeleteButton && (
              <ActionIcon
                color="red"
                pos={"absolute"}
                right={-50}
                size="input-sm"
                variant="default"
                onClick={handleClickDelete}
              >
                <IconTrash color="red" />
              </ActionIcon>
            )}
          </Flex>
        ) : (
          <>
            <FileButton
              onChange={(file) => file && setFile(file)}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Button
                  {...props}
                  variant="outline"
                  w={100}
                  h={100}
                  c={"#10100f"}
                  style={{
                    border: `1px solid ${error ? "red" : "#10100f"}`,
                  }}
                >
                  <IconUpload />
                </Button>
              )}
            </FileButton>
            {error && (
              <Text size="xs" c="red">
                {error}
              </Text>
            )}
          </>
        )}
      </Flex>
    </Group>
  );
};

export default memo(MImageInput);
