import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { IATCDocument } from "../../../interface/iATCDocument";
import { StudentModel } from "../../../models/student.model";
import { Training } from "../../../models/training.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";

export const getTrainingDataByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const trainingId = req.params.trainingId;
  const data = await Training.findById(trainingId).populate("atcId");
  if (!data) {
    return next(
      new ErrorResponse(
        ErrorType.INTERNAL_ERROR,
        "Invalid training id",
        "Cound not find the training"
      )
    );
  }

  const csvData = await StudentModel.aggregate([
    {
      $match: {
        trainingId: new mongoose.Types.ObjectId(trainingId),
      },
    },
    {
      $project: {
        Name: "$name",
        College: "$studentCollegeName",
        RollNumber: "$rollNumber",
        Email: "$email",
        Feedback: "$feedback",
      },
    },
  ]);

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Details delivered",
    data: {
      csv: csvData,
      atcName: (data?.atcId as IATCDocument).atcName,
      startDate: data?.startDate,
      endDate: data?.endDate,
      title: data?.title,
      images: data?.trainingImages,
      description: data?.description,
      totalStudents: data?.totalStudents,
      isApproved: data?.isApproved,
    },
  });
};
