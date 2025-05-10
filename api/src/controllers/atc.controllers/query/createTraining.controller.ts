import { NextFunction, Request, Response } from "express";
import { getFilePaths } from "../../../utils/getFilePaths";
import { Training } from "../../../models/training.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";
import { ATC } from "../../../models/atc.model";
import { readExcelFromUrl } from "../../../utils/readXLSXData";
import { StudentModel } from "../../../models/student.model";

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

  await ATC.findByIdAndUpdate(
    atcId,
    {
      $push: { trainings: newTraining._id },
    },
    { new: true }
  );

  const rows = await readExcelFromUrl(attendencePath as string);

  const students = rows.map((row) => ({
    name: row["Name"],
    rollNumber: row["RollNumber"],
    studentCollegeName: row["College"],
    email: row["Email"],
    feedback: row["Feedback"] || "",
    certificateGenerated: false,
    trainingId: newTraining._id,
  }));

  const inserted = await StudentModel.insertMany(students);

  if (!inserted) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Something went wrong while creating student entry",
        "Internal Server Error"
      )
    );
  }

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Training Created Successfully!",
    message: "Training Record Added successfully!",
    data: newTraining._id,
  });
};
