import { Request, Response, NextFunction } from "express";
import { ATC } from "../../../models/atc.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";
import mongoose from "mongoose";

export const changeATCStatusByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { status } = req.body;

  const atc = await ATC.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    {
      $set: {
        active: status,
      },
    },
    { new: true }
  );

  if (!atc) {
    return next(
      new ErrorResponse(ErrorType.NOT_FOUND, "ATC not found", "ATC not found")
    );
  }

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: `ATC ${status === false ? "Blocked" : "Unblocked"} successfully!`,
  });
};
