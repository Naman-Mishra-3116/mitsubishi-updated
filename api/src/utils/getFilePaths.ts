import { Request } from "express";

export const getFilePaths = (
  req: Request,
  directory: "images" | "trainings" | "pdfs",
  fileName: string | undefined
) => {
  if (fileName) {
    return `${req.protocol}://${req.get(
      "host"
    )}/uploads/${directory}/${fileName}`;
  }

  return undefined;
};
