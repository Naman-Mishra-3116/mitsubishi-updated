import { NextFunction, Request, Response } from "express";
import { AdminUser } from "../../../models/adminUser.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";

const completeProfileForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = res.locals.userData.id;
  const {
    fullName,
    email,
    phoneNumber,
    city,
    state,
    postalCode,
    about,
    address,
  } = req.body;

  const admin = await AdminUser.findByIdAndUpdate(
    id,
    {
      fullName,
      email,
      phoneNumber,
      city,
      state,
      postalCode,
      about,
      address,
    },
    { new: true }
  );

  if (!admin) {
    return next(
      new ErrorResponse(
        ErrorType.NOT_FOUND,
        "Admin not found",
        "Failed to update profile data"
      )
    );
  }

  return jsonResponse(res, {
    status: "success",
    statusCode: 201,
    title: "Profile Updated Successfully",
    message: "Profile saved with modified changes",
  });
};

export default completeProfileForm;
