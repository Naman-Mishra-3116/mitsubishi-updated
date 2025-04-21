import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { JwtConfig } from "../../../config/jwtConfig";
import { AdminUser } from "../../../models/adminUser.model";
import { jsonResponse } from "../../../utils/jsonResponse";
import { ErrorResponse, ErrorType } from "../../../utils/customError";

const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  /**
   * @dao goes here
   */
  const admin = await AdminUser.findOne({ email });

  if (!admin) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Admin not found",
        "Please check your Email id once"
      )
    );
  }

  if (admin.isBlocked) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Forbidden Access",
        "Your access to this application has been blocked by Senior Admin"
      )
    );
  }

  const isValidPassword = await bcrypt.compare(password, admin.password);

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
    id: admin._id as string,
    role: admin.role,
    permission: admin.permission,
    expiresIn: "3h",
  });

  res.cookie("token", token, {
    maxAge: 3 * 60 * 60 * 1000,
    secure: false,
    httpOnly: true,
    signed: true,
  });

  return jsonResponse(res, {
    status: "success",
    statusCode: 201,
    title: "Logged in successfully!",
    message: `Welcome back ${admin.fullName}`,
  });
};

export default adminLogin;
