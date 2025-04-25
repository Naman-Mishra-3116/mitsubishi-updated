import { Request, Response, NextFunction } from "express";
import { paginationService } from "../../../services/paginationService";
import { Training } from "../../../models/training.model";
import { jsonResponse } from "../../../utils/jsonResponse";

export const viewAllTraining = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);
  const data = await paginationService(Training, page, limit, [
    {
      $lookup: {
        from: "atcs",
        localField: "atcId",
        foreignField: "_id",
        as: "atc",
      },
    },
    {
      $unwind: {
        path: "$atc",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "managers",
        localField: "atcId",
        foreignField: "listOfATC",
        as: "manager",
      },
    },
    {
      $unwind: {
        path: "$manager",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 0,
        trainingId: "$_id",
        atcId: 1,
        title: 1,
        startDate: 1,
        endDate: 1,
        totalStudents: 1,
        isApproved: 1,
        atcName: "$atc.atcName",
        managerName: "$manager.name",
      },
    },
  ]);

  const serialData = data?.data.map((item, index) => {
    return {
      ...item,
      serialNumber: limit * (page - 1) + index + 1,
    };
  });
  return jsonResponse(res, {
    data: {
      ...data,
      data: serialData,
    },
    status: "success",
    statusCode: 200,
    title: "training fetched",
  });
};
