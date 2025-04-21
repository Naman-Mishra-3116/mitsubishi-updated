import { Request, Response, NextFunction } from "express";
import { paginationService } from "../../../services/paginationService";
import { ATCManager } from "../../../models/manager.model";
import { jsonResponse } from "../../../utils/jsonResponse";

export const getAllManagers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);
  const data = await paginationService(ATCManager, page, limit, [
    {
      $lookup: {
        from: "atcs",
        localField: "listOfATC",
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
      $project: {
        name: 1,
        email: 1,
        phoneNumber: 1,
        active: 1,
        atcName: "$atc.atcName",
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
