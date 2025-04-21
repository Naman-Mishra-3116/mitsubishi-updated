import { Request, Response, NextFunction } from "express";
import { ATCManager } from "../../../models/manager.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";

export const changeManagerStatusById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { status } = req.body;

  const manager = await ATCManager.findByIdAndUpdate(
    id,
    {
      $set: {
        active: status,
      },
    },
    { new: true }
  );

  if (!manager) {
    return next(
      new ErrorResponse(ErrorType.NOT_FOUND, "ATC not found", "ATC not found")
    );
  }

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: `Manager ${
      status === false ? "Blocked" : "Unblocked"
    } successfully!`,
  });
};
