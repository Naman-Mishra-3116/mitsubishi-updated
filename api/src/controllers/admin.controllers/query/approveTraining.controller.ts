import { Request, Response, NextFunction } from "express";
import { Training } from "../../../models/training.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";

export const approveTrainingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const trainingId = req.params.id;
  const training = await Training.findByIdAndUpdate(trainingId, {
    $set: {
      isApproved: true,
    },
  });

  if (!training) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Could not find training record",
        "Training not found"
      )
    );
  }

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Training approved",
  });
};
