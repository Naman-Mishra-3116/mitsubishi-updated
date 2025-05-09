import { Request, Response, NextFunction } from "express";
import { getFilePaths } from "../../../utils/getFilePaths";
import { InfoModel } from "../../../models/info.model";
import { jsonResponse } from "../../../utils/jsonResponse";
import { ErrorResponse, ErrorType } from "../../../utils/customError";

export const createEditYearlyInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as IFiles;
  let updatePayload: Record<string, any> = {};

  if (files["calendar"]?.length > 0) {
    updatePayload.calenderLink = getFilePaths(
      req,
      "pdfs",
      files["calendar"][0].filename
    );
  }

  if (files["signature"]?.length > 0) {
    updatePayload.signatureOfMitsubhiHead = getFilePaths(
      req,
      "images",
      files["signature"][0].filename
    );
  }

  const { name, email, designation } = req.body;

  if (name) updatePayload.nameOfMitsubishiHead = name;
  if (email) updatePayload.emailOfMitsubishiHead = email;
  if (designation) updatePayload.designationOfMitsubhiHead = designation;

  const info = await InfoModel.findOneAndUpdate({}, updatePayload, {
    new: true,
    upsert: true,
  });

  if (!info) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "Could not update information",
        "This request could not be processed at this time"
      )
    );
  }

  return jsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Yearly Information updated Successfully!",
  });
};
