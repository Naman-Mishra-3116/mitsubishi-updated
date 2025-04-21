import { NextFunction, Request, Response } from "express";
import { getFilePaths } from "../../../utils/getFilePaths";

export const createTraining = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let trainingImagePaths: string[] = [];
  let attendencePath: string | undefined;
  let feedbackPath: string | undefined;
  const files = req.files as IFiles;
  const { atcId, startDate, endDate, totalStudents, title, description } =
    req.body;

  if (files?.["trainingImages"]) {
    trainingImagePaths = files["trainingImages"].map(
      (file: Express.Multer.File) => getFilePaths(req, "images", file.filename)
    ) as string[];
  }

  if (files["attendence"] && files["attendence"].length > 0) {
    attendencePath = getFilePaths(
      req,
      "trainings",
      files["attendence"][0].filename
    );
  }

  if (files["feedback"] && files["feedback"].length > 0) {
    feedbackPath = getFilePaths(
      req,
      "trainings",
      files["feedback"][0].filename
    );
  }

  res.status(200).json({
    trainingImagePaths,
    attendencePath,
    feedbackPath,
  });
};
