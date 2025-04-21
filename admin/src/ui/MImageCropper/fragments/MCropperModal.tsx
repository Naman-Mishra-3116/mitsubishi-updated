"use client";
import { Box, Button, SimpleGrid } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Cropper from "react-easy-crop";
import { ICropArea } from "../helpers/cropper.types";
import { cropperHelper } from "../helpers/cropperHelper";
import { modals } from "@mantine/modals";

interface IProps {
  file: File | null;
  saveImage: Dispatch<SetStateAction<File | undefined>>;
  cropShape?: "rect" | "round";
  aspectRatio?: number;
}

const CropperModal: React.FC<IProps> = ({
  file,
  saveImage,
  cropShape = "rect",
  aspectRatio,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropArea, setCropArea] = useState<ICropArea | null>(null);

  useEffect(() => {
    if (file) {
      handleImageChange(file);
    }
  }, [file]);

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      notifications.show({
        color: "red",
        message: "File size should be less than or equal to 1MB",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_: unknown, croppedArea: ICropArea) => {
    setCropArea(croppedArea);
  }, []);

  const handleCrop = async () => {
    if (image && cropArea) {
      setLoading(true);
      const { croppedImage, file } = await cropperHelper(image, cropArea);
      setCroppedImage(croppedImage);
      setLoading(false);
      modals.close("cropperModal");
      saveImage(file);
    }
  };

  return (
    <Box pos={"relative"}>
      {image && (
        <Box style={{ position: "relative", width: "100%", height: 400 }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio ?? 1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape={cropShape ?? "rect"}
          />
        </Box>
      )}
      <SimpleGrid mt="md" cols={2} spacing="md">
        <Button
          variant="filled"
          color="red"
          onClick={() => modals.close("cropperModal")}
        >
          Cancel
        </Button>
        <Button onClick={handleCrop} loading={loading}>
          Save
        </Button>
      </SimpleGrid>
    </Box>
  );
};

export default React.memo(CropperModal);
