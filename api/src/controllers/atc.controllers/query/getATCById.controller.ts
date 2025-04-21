import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ICollegeDocument } from "../../../interface/iCollegeDocument";
import { ATC } from "../../../models/atc.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";
import { getLatitudeAndLongitude } from "../../../utils/getLocation";

export const getATCById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const atc = await ATC.findById(new mongoose.Types.ObjectId(id)).populate(
    "collegeID"
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


  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Data fetched successfully!",
    data: {
      collegeName: (atc.collegeID as ICollegeDocument).collegeName,
      atcName: atc.atcName,
      atcImage: atc.atcImage,
      address: atc.address,
      description: atc.description,
      city: (atc.collegeID as ICollegeDocument).collegeCity,
      state: atc.state,
    },
  });
};
