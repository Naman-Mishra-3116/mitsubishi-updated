import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ATC } from "../../../models/atc.model";
import { ATCManager } from "../../../models/manager.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { getFilePaths } from "../../../utils/getFilePaths";
import { jsonResponse } from "../../../utils/jsonResponse";
import { CollegeModel } from "../../../models/college.model";
import { getLatitudeAndLongitude } from "../../../utils/getLocation";

export const createATC = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    atcName,
    address,
    description,
    city,
    state,
    managerName,
    managerEmail,
    managerPassword,
    phoneNumber,
    collegeName,
  } = req.body;

  const atc = await ATC.findOne({ atcName });
  const existingCollege = await CollegeModel.findOne({ collegeName });
  const existingManager = await ATCManager.findOne({
    email: managerEmail,
    phoneNumber: phoneNumber,
  });

  if (existingCollege) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "An ATC is already existing in this college",
        "Specify a different college"
      )
    );
  }

  if (atc) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "ATC already exist with that name",
        "ATC already exist"
      )
    );
  }

  if (existingManager) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "The ATC manager belongs to some other ATC, Please specify a different one",
        "Manger Already Exist"
      )
    );
  }

  const { latitude, longitude } = await getLatitudeAndLongitude(city);
  const college = await CollegeModel.create({
    collegeName,
    collegeCity: city,
    latitude,
    longitude,
  });
  const atcImage = getFilePaths(req, "images", req?.file?.filename);
  const newATC = await ATC.create({
    atcName,
    atcImage,
    address,
    description,
    state,
    collegeID: new mongoose.Types.ObjectId(college._id as string),
  });

  const hashedPassword = await bcryptjs.hash(managerPassword, 5);
  const newManager = await ATCManager.create({
    active: true,
    name: managerName,
    email: managerEmail,
    password: hashedPassword,
    phoneNumber: phoneNumber,
    listOfATC: new mongoose.Types.ObjectId(newATC._id as string),
  });

  return jsonResponse(res, {
    title: "ATC Created Successfully!",
    message: "ATC with specified data created",
    status: "success",
    statusCode: 200,
    data: { atcID: newATC._id, managerId: newManager._id },
  });
};
