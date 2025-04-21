import { NextFunction, Request, Response } from "express";
import { AdminUser } from "../../../models/adminUser.model";
import { jsonResponse } from "../../../utils/jsonResponse";
import bcrypt from "bcryptjs";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { getFilePaths } from "../../../utils/getFilePaths";

const createAdminUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file;
  const {
    fullName,
    email,
    password,
    adminType,
    permission,
    isBlocked,
    about,
    address,
    city,
    state,
    postalCode,
    phoneNumber,
  } = req.body;

  const existingAdmin = await AdminUser.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (existingAdmin) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Admin already exiist",
        "The new admin you are trying to create already exist!"
      )
    );
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const profileURL = getFilePaths(req, "images", file?.filename);

  /**
   * @dao goes here
   */

  await AdminUser.create({
    fullName,
    email,
    password: hashedPassword,
    role: adminType,
    permission,
    isBlocked,
    about,
    address,
    city,
    state,
    postalCode,
    phoneNumber,
    profileImage: file ? profileURL : "",
  });

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Admin Created Successfully!",
    message: "Admin Created Successfully!",
  });
};

export default createAdminUser;
