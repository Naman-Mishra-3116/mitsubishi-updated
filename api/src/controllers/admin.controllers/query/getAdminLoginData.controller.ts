import { NextFunction, Request, Response } from "express";
import { AdminUser } from "../../../models/adminUser.model";
import { jsonResponse } from "../../../utils/jsonResponse";
import { ErrorResponse, ErrorType } from "../../../utils/customError";

const getAdminLoginData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, permission, role } = res.locals.userData;
  const admin = await AdminUser.findById(id).select("-password");
  if (!admin) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Admin not found",
        "The account you are trying to access does not exist!"
      )
    );
  }

  return jsonResponse(res, {
    title: "Admin Data",
    status: "success",
    statusCode: 200,
    data: {
      id,
      permission,
      role,
      fullName: admin.fullName,
      email: admin.email,
    },
    message: "Admin Data fetched successfully!",
  });
};

export default getAdminLoginData;
