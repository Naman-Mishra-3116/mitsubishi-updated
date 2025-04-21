import { NextFunction, Request, Response } from "express";
import { AdminUser } from "../../../models/adminUser.model";
import { jsonResponse } from "../../../utils/jsonResponse";
import { ErrorResponse, ErrorType } from "../../../utils/customError";

const getAdminProfileFormData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = res.locals.userData.id;
  const admin = await AdminUser.findById(id).select("-password");
  if (!admin) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "No Admin found",
        "The account your are tyring to access does not exist in our system!"
      )
    );
  }

  return jsonResponse(res, {
    title: "Admin Data",
    status: "success",
    statusCode: 200,
    data: admin,
    message: "Admin Data fetched successfully!",
  });
};

export default getAdminProfileFormData;
