import { NextFunction, Request, Response } from "express";
import { ATCManager } from "../../../models/manager.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import bcrypt from "bcryptjs";
import { JwtConfig } from "../../../config/jwtConfig";
import { jsonResponse } from "../../../utils/jsonResponse";

export const managerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const manager = await ATCManager.findOne({ email });

  if (!manager) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Manager not found",
        "Please check your Email id once"
      )
    );
  }

  if (!manager.active) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Forbidden Access",
        "Your access to this application has been blocked by Senior Admin"
      )
    );
  }

  const isValidPassword = await bcrypt.compare(password, manager.password);
  if (!isValidPassword) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Invalid Credentials",
        "Please provide a valid password"
      )
    );
  }

  const token = JwtConfig.assignToken({
    id: manager._id as string,
    expiresIn: "12h",
    atcId: manager.listOfATC as unknown as string,
  });

  res.cookie("token", token, {
    maxAge: 12 * 60 * 60 * 1000,
    secure: false,
    httpOnly: true,
    signed: true,
  });

  return jsonResponse(res, {
    status: "success",
    statusCode: 201,
    title: "Logged in successfully!",
    message: `Welcome back ${manager.name}`,
  });
};
