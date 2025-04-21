import { ICropArea } from "./cropper.types";

export const cropperHelper = (imageSrc: string, cropArea: ICropArea) => {
  return new Promise<{ croppedImage: string; file: File }>(
    async (resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject("Failed to get context");
          return;
        }

        const { x, y, width, height } = cropArea;
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(image, -x, -y, image.width, image.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const croppedImageUrl = canvas.toDataURL("image/png");

              const file = new File([blob], "cropped-image.png", {
                type: "image/png",
              });

              resolve({ croppedImage: croppedImageUrl, file });
            } else {
              reject("Failed to convert to Blob");
            }
          },
          "image/png",
          1
        );
      };

      image.onerror = (error) => reject(error);
    }
  );
};
