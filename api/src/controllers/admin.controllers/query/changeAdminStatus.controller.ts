import { Request, Response, NextFunction } from "express";
import { AdminUser } from "../../../models/adminUser.model";
import mongoose from "mongoose";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";

export const changeAdminStatusByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { status } = req.body;

  const admin = await AdminUser.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    {
      $set: {
        isBlocked: status,
      },
    },
    {
      new: true,
    }
  );

  if (!admin) {
    return next(
      new ErrorResponse(
        ErrorType.NOT_FOUND,
        "Admin Your are trying to reach does not exist",
        "Admin not found"
      )
    );
  }

  return jsonResponse(res, {
    title: `Admin ${status === false ? "Unblocked" : "Blocked"} Successfully!`,
    status: "success",
    statusCode: 200,
  });
};
