import { NextFunction, Request, Response } from "express";
import { ATCManager } from "../../../models/manager.model";
import { Types } from "mongoose";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";

export const getManagerByATCId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { atcID } = req.query;
  const manager = await ATCManager.findOne({
    listOfATC: new Types.ObjectId(atcID as string),
  }).select("_id name email phoneNumber");

  if (!manager) {
    return next(
      new ErrorResponse(
        ErrorType.NOT_FOUND,
        "Manager not found for given ATC ID",
        "Manger not found"
      )
    );
  }

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Manager fetched successfully!",
    data: {
      managerName: manager.name,
      managerEmail: manager.email,
      phoneNumber: manager.phoneNumber,
      _id: manager._id,
    },
  });
};
