import { NextFunction, Request, Response } from "express";
import { paginationService } from "../../../services/paginationService";
import { ATC } from "../../../models/atc.model";
import { jsonResponse } from "../../../utils/jsonResponse";

export const getAllATC = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const data = await paginationService(ATC, page, limit, [
    {
      $lookup: {
        from: "managers",
        localField: "_id",
        foreignField: "listOfATC",
        as: "managerInfo",
      },
    },
    {
      $lookup: {
        from: "colleges",
        localField: "collegeID",
        foreignField: "_id",
        as: "collegeInfo",
      },
    },
    {
      $unwind: {
        path: "$collegeInfo",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$managerInfo",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        atcName: 1,
        atcImage: 1,
        state: 1,
        active: 1,
        totalTrainings: {
          $size: { $ifNull: ["$trainings", []] },
        },
        managerName: "$managerInfo.name",
        collegeName: "$collegeInfo.collegeName",
        city: "$collegeInfo.collegeCity",
      },
    },
  ]);

  return jsonResponse(res, {
    data,
    title: "Data fetched",
    status: "success",
    statusCode: 200,
  });
};
