import { Request, Response, NextFunction } from "express";
import { ATC } from "../../../models/atc.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";
import { ICollegeDocument } from "../../../interface/iCollegeDocument";

export const getCollegeProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { atcId } = res.locals.userData;
  const atcData = await ATC.findById(atcId).populate("collegeID");

  if (!atcData) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Could not fetch College Data",
        "Our servers could not fetch your college Data please try again later"
      )
    );
  }

  const {
    collegeCity,
    collegeName,
    collegeLogo,
    nameOfHOD,
    latitude,
    longitude,
    managerSignature,
    hodSignature,
  } = atcData?.collegeID as ICollegeDocument;

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "College Data fetched",
    data: {
      collegeName,
      collegeCity,
      collegeLogo,
      nameOfHOD,
      latitude,
      longitude,
      managerSignature,
      hodSignature,
    },
  });
};
