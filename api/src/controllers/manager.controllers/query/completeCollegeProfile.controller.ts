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
  const { collegeName, nameOfHOD } = req.body;
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

  const college = await CollegeModel.findById(atcData.collegeID);

  if (!college) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Could not fetch College Data",
        "Our servers could not fetch your college Data please try again later"
      )
    );
  }

  const files = req.files as IFiles;
  let updatePayload: Record<string, any> = {};

  if (files?.["collegeLogo"].length > 0) {
    updatePayload.collegeLogo = getFilePaths(
      req,
      "images",
      files["collegeLogo"][0].filename
    );
  }

  if (files?.["managerSignature"].length > 0) {
    updatePayload.collegeLogo = getFilePaths(
      req,
      "images",
      files["managerSignature"][0].filename
    );
  }

  if (files?.["hodSignature"].length > 0) {
    updatePayload.collegeLogo = getFilePaths(
      req,
      "images",
      files["hodSignature"][0].filename
    );
  }

  if (nameOfHOD) updatePayload.nameOfHOD = nameOfHOD;
  if (collegeName) updatePayload.collegeName = collegeName;

  const finalCheck = {
    nameOfHOD: updatePayload.nameOfHOD ?? college.nameOfHOD,
    collegeName: updatePayload.collegeName ?? college.collegeName,
    collegeLogo: updatePayload.collegeLogo ?? college.collegeLogo,
    managerSignature:
      updatePayload.managerSignature ?? college.managerSignature,
    hodSignature: updatePayload.hodSignature ?? college.hodSignature,
  };

  if (
    finalCheck.nameOfHOD &&
    finalCheck.collegeName &&
    finalCheck.collegeLogo &&
    finalCheck.managerSignature &&
    finalCheck.hodSignature
  ) {
    updatePayload.profileCompleted = true;
  }

  const newData = await CollegeModel.findByIdAndUpdate(
    atcData.collegeID,
    updatePayload,
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
    message: "Profile Updated successfully!",
  });
};
