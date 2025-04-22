import { NextFunction, Request, Response } from "express";
import { ATC } from "../../../models/atc.model";
import { CollegeModel } from "../../../models/college.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { getFilePaths } from "../../../utils/getFilePaths";
import { jsonResponse } from "../../../utils/jsonResponse";

export const completeCollegeProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { atcId } = res.locals.userData;
  const atcData = await ATC.findById(atcId).select("collegeID");

  if (!atcData) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Could not fetch College Data",
        "Our servers could not fetch your college Data please try again later"
      )
    );
  }

  const collegeLogo = getFilePaths(req, "images", req?.file?.filename);
  const { collegeName, nameOfHOD } = req.body;

  const newData = await CollegeModel.findByIdAndUpdate(
    atcData.collegeID,
    {
      nameOfHOD,
      collegeName,
      collegeLogo,
      profileCompleted: true,
    },
    { new: true }
  );

  if (!newData) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Could not find college",
        "Our servers could not fetch your college Data please try again later"
      )
    );
  }

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Profile Completed Successfully!",
  });
};
