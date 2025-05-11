import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Training } from "../../../models/training.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";

export const getATCDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { atcId } = res.locals.userData;
  const data = await Training.aggregate([
    {
      $match: {
        atcId: new mongoose.Types.ObjectId(atcId),
      },
    },
    {
      $group: {
        _id: null,
        totalStudents: { $sum: "$totalStudents" },
        totalTrainings: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        totalStudents: 1,
        totalTrainings: 1,
      },
    },
  ]);

  if (!data) {
    return next(
      new ErrorResponse(
        ErrorType.INTERNAL_ERROR,
        "Could not fetch the data",
        "Please try again later"
      )
    );
  }

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Data fetched",
    data: {
      totalStudents: data[0]?.totalStudents ?? 0,
      totalTrainings: data[0]?.totalTrainings ?? 0,
    },
  });
};
