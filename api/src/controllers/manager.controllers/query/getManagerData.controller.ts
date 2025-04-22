import { Request, Response, NextFunction } from "express";
import { ATCManager } from "../../../models/manager.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";
import { ATC } from "../../../models/atc.model";
import { ICollegeDocument } from "../../../interface/iCollegeDocument";

export const getManagerLoginData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, atcId } = res.locals.userData;
  const manager = await ATCManager.findById(id).select("-password");
  const atc = await ATC.findById(atcId).populate("collegeID");

  if (!manager) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Manager not found",
        "The account you are trying to access does not exist!"
      )
    );
  }

  return jsonResponse(res, {
    title: "Manager Data",
    status: "success",
    statusCode: 200,
    data: {
      id,
      atcId,
      fullName: manager.name,
      email: manager.email,
      phoneNumber: manager.phoneNumber,
      atcName: atc?.atcName,
      profileCompleted: (atc?.collegeID as ICollegeDocument).profileCompleted,
    },
    message: "Manager Data fetched successfully!",
  });
};
