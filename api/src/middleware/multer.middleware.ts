import { randomUUID } from "crypto";
import { Request } from "express";
import multer, { diskStorage, FileFilterCallback } from "multer";
import path from "path";

export const IMAGE_STORAGE_PATH = path.join(
  __dirname,
  "../../../uploads/images"
);
export const XLSX_STORAGE_PATH = path.join(
  __dirname,
  "../../../uploads/trainings"
);

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    ["image/jpeg", "image/png", "application/vnd.ms-excel"].includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    console.log("invalid mime type: ", file.mimetype);
    cb(null, false);
  }
};

const storage = diskStorage({
  destination: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, IMAGE_STORAGE_PATH);
    } else {
      cb(null, XLSX_STORAGE_PATH);
    }
  },
  filename: (_req, file, cb) => {
    const uniqueId = randomUUID() + "-" + Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueId}${ext}`);
  },
});

export const UploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 },
});
