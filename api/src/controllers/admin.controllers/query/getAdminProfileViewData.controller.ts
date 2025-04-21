import { NextFunction, Request, Response } from "express";
import { AdminUser } from "../../../models/adminUser.model";
import { jsonResponse } from "../../../utils/jsonResponse";
import { ErrorResponse, ErrorType } from "../../../utils/customError";

const getAdminProfileViewData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = res.locals.userData;
  const admin = await AdminUser.findById(id).select("-password");

  if (!admin) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "No Admin found",
        "The account you are tryingg to access does not exist in our system!"
      )
    );
  }

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Admin Profile view data",
    data: {
      id,
      profileImage: admin.profileImage,
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role,
      about: admin.about,
    },
  });
};

export default getAdminProfileViewData;
