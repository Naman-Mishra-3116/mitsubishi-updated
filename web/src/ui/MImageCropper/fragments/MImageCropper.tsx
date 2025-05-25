"use client";
import {
  Box,
  Button,
  FileButton,
  Group,
  Modal,
  SimpleGrid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { ICropArea } from "../helpers/cropper.types";
import { cropperHelper } from "../helpers/cropperHelper";

interface IProps {
  saveImage: Dispatch<SetStateAction<File | undefined>>;
  cropShape?: "rect" | "round";
}

const MImageCropper: React.FC<IProps> = ({ saveImage, cropShape }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropArea, setCropArea] = useState<ICropArea | null>(null);
  const [isModalOpen, { open, close }] = useDisclosure(false);

  const handleImageChange = (file: File | null) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (file && file.size <= MAX_FILE_SIZE) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        open();
      };
      reader.readAsDataURL(file);
    } else {
      notifications.show({
        color: "red",
        message: "File size should be less than or equal to 1MB",
      });
    }
  };

  const onCropComplete = useCallback((_: unknown, croppedArea: ICropArea) => {
    setCropArea(croppedArea);
  }, []);

  const handleCrop = async () => {
    if (image && cropArea) {
      setLoading(true);
      const { croppedImage, file } = await cropperHelper(image, cropArea);
      setCroppedImage(croppedImage);
      saveImage(file);
      setLoading(false);
      close();
    }
  };

  return (
    <Box pos={"relative"}>
      {!image ? (
        <Group justify="center">
          <FileButton
            onChange={handleImageChange}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button {...props} bg={"red"} mt={"lg"}>
                Edit Profile
              </Button>
            )}
          </FileButton>
        </Group>
      ) : (
        <Modal
          opened={isModalOpen}
          onClose={close}
          title="Crop your Image"
          size="lg"
          zIndex={1000}
          centered
        >
          {image && (
            <Box style={{ position: "relative", width: "100%", height: 400 }}>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape={cropShape ?? "rect"}
              />
            </Box>
          )}
          <SimpleGrid mt="md" cols={2} spacing="md">
            <Button variant="filled" color="red" onClick={close}>
              Cancel
            </Button>
            <Button onClick={handleCrop} loading={loading}>
              Save
            </Button>
          </SimpleGrid>
        </Modal>
      )}
    </Box>
  );
};

export default React.memo(MImageCropper);
