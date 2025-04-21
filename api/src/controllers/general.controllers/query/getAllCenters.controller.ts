import { Request, Response, NextFunction } from "express";
import { paginationService } from "../../../services/paginationService";
import { ATC } from "../../../models/atc.model";
import { jsonResponse } from "../../../utils/jsonResponse";

export const getAllCenters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);
  const data = await paginationService(ATC, page, limit, [
    {
      $match: {
        active: true,
      },
    },
    {
      $lookup: {
        from: "colleges",
        localField: "collegeID",
        foreignField: "_id",
        as: "college",
      },
    },
    {
      $unwind: {
        path: "$college",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "managers",
        localField: "_id",
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
        atcName: 1,
        atcImage: 1,
        address: 1,
        description: 1,
        state: 1,
        collegeName: "$college.collegeName",
        city: "$college.collegeCity",
        managerName: "$manager.name",
        managerEmail: "$manager.email",
        totalTraining: {
          $size: "$trainings",
        },
      },
    },
  ]);

  return jsonResponse(res, {
    data: data,
    status: "success",
    statusCode: 200,
    title: "Data fetched",
  });
};
