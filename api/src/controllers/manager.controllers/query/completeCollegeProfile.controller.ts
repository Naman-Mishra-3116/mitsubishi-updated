import { Request, Response, NextFunction } from "express";
import { ATC } from "../../../models/atc.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { getFilePaths } from "../../../utils/getFilePaths";
import { CollegeModel } from "../../../models/college.model";
import { getLatitudeAndLongitude } from "../../../utils/getLocation";
import { jsonResponse } from "../../../utils/jsonResponse";

export const completeCollegeProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { atcId } = res.locals.userData;
  const collegeId = await ATC.findById(atcId).select("collegeID");

  if (!collegeId) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Could not fetch College Data",
        "Our servers could not fetch your college Data please try again later"
      )
    );
  }

  const collegeLogo = getFilePaths(req, "images", req?.file?.filename);
  const { collegeName, collegeCity, nameOfHOD } = req.body;
  const { latitude, longitude } = await getLatitudeAndLongitude(collegeCity);
  const newData = await CollegeModel.findByIdAndUpdate(collegeId, {
    collegeCity,
    nameOfHOD,
    collegeName,
    latitude,
    longitude,
    collegeLogo,
    profileCompleted: true,
  });

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
