import { NextFunction, Request, Response } from "express";
import { ATC } from "../../../models/atc.model";
import { getFilePaths } from "../../../utils/getFilePaths";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";
import { CollegeModel } from "../../../models/college.model";
import { getLatitudeAndLongitude } from "../../../utils/getLocation";

export const editATCById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { atcName, address, description, city, state, collegeName } = req.body;
  const atcImage = getFilePaths(req, "images", req.file?.filename);

  const atc = await ATC.findByIdAndUpdate(
    id,
    {
      atcName,
      atcImage,
      address,
      description,
      state,
    },
    { new: true }
  );

  if (!atc) {
    return next(
      new ErrorResponse(
        ErrorType.NOT_FOUND,
        "Could not find ATC",
        "ATC not found, please try again later"
      )
    );
  }

  if (atc?.collegeID) {
    const { latitude, longitude } = await getLatitudeAndLongitude(city);
    await CollegeModel.findByIdAndUpdate(
      atc.collegeID,
      {
        latitude,
        longitude,
        collegeCity: city,
        collegeName: collegeName,
      },
      { new: true }
    );
  }

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "ATC Data updated successfully",
  });
};
