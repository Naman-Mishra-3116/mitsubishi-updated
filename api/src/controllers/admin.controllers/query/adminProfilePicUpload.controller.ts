import { NextFunction, Request, Response } from "express";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { AdminUser } from "../../../models/adminUser.model";
import { jsonResponse } from "../../../utils/jsonResponse";
import { getFilePaths } from "../../../utils/getFilePaths";

export const adminProfilePicUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file;
  const id = res.locals.userData.id;

  if (!file) {
    next(
      new ErrorResponse(
        ErrorType.NOT_FOUND,
        "No image was provided",
        "No profile pic found"
      )
    );
  }

  const imageUrl = getFilePaths(req, "images", req?.file?.filename);
  const data = await AdminUser.findByIdAndUpdate(id, {
    profileImage: imageUrl,
  });

  if (!data) {
    next(
      new ErrorResponse(
        ErrorType.INTERNAL_ERROR,
        "Internal Server Error",
        "Seems like our servers are not working!, please try again later!"
      )
    );
  }

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Profile Updated Successfully!",
    data: data?.profileImage,
  });
};
