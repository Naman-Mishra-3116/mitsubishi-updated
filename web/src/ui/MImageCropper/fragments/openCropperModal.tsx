import { modals } from "@mantine/modals";
import { Dispatch, SetStateAction } from "react";
import MCropperModal from "./MCropperModal";

const openImageCropperModal = (
  file: File | null,
  saveCroppedImage: Dispatch<SetStateAction<File|undefined>>,
  cropperShape?: "rect" | "round",
  aspectRatio?:number,
) => {
  return modals.open({
    modalId: "cropperModal",
    title: "Crop Image",
    size: "700px",
    centered: true,
    zIndex: 100,
    withCloseButton: true,
    children: (
      <MCropperModal
        aspectRatio={aspectRatio}
        file={file}
        saveImage={saveCroppedImage}
        cropShape={cropperShape}
      />
    ),
  });
};

export default openImageCropperModal;
