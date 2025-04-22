import { NextFunction, Request, Response } from "express";
import { getFilePaths } from "../../../utils/getFilePaths";
import { Training } from "../../../models/training.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";

export const createTraining = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let trainingImagePaths: string[] = [];
  let attendencePath: string | undefined;
  const files = req.files as IFiles;
  const { startDate, endDate, totalStudents, title, description } = req.body;
  const { atcId } = res.locals.userData;

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

  const existingTraining = await Training.findOne({
    atcId,
    title,
    startDate: { $lte: endDate },
    endDate: { $gte: startDate },
  });

  if (existingTraining) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "This training has already been added to the database for your ATC in the given date range",
        "This training has already been added to the database for your ATC in the given date range"
      )
    );
  }

  const newTraining = await Training.create({
    atcId,
    startDate,
    endDate,
    title,
    description,
    totalStudents,
    trainingImages: trainingImagePaths,
    attendence: attendencePath,
    isApproved: false,
  });

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Training Created Successfully!",
    data: newTraining._id,
  });
};
