import { Request, Response, NextFunction } from "express";
import { paginationService } from "../../../services/paginationService";
import { Training } from "../../../models/training.model";
import mongoose from "mongoose";
import { jsonResponse } from "../../../utils/jsonResponse";

export const getAllATCTraining = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { atcId } = res.locals.userData;
  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);

  const data = await paginationService(Training, page, limit, [
    {
      $match: {
        atcId: new mongoose.Types.ObjectId(atcId),
      },
    },
    {
      $project: {
        _id: 1,
        totalStudents: 1,
        title: 1,
        startDate: 1,
        endDate: 1,
        approved: "$isApproved",
      },
    },
  ]);

  const serializedData = data.data.map((item, index) => {
    return {
      ...item,
      serialNumber: index + 1,
    };
  });
  return jsonResponse(res, {
    data: {
      ...data,
      data: serializedData,
    },
    status: "success",
    statusCode: 200,
    title: "Training data fetched",
  });
};
