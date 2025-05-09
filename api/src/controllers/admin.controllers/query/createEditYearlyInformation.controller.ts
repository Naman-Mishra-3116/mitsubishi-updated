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
  let signaturePath: string = "";
  let calendarPath: string = "";
  if (files["calendar"] && files["calendar"].length > 0) {
    calendarPath = getFilePaths(
      req,
      "pdfs",
      files["calendar"][0].filename
    ) as string;
  }

  if (files["signature"] && files["signature"].length > 0) {
    signaturePath = getFilePaths(
      req,
      "images",
      files["signature"][0].filename
    ) as string;
  }

  const { name, email, designation } = req.body;

  const info = await InfoModel.findOneAndUpdate(
    {},
    {
      calenderLink: calendarPath,
      nameOfMitsubishiHead: name,
      emailOfMitsubishiHead: email,
      signatureOfMitsubhiHead: signaturePath,
      designationOfMitsubhiHead: designation,
    },
    {
      new: true,
      upsert: true,
    }
  );

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
