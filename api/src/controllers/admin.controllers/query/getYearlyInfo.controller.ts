import { Request, Response, NextFunction } from "express";
import { jsonResponse } from "../../../utils/jsonResponse";
import { InfoModel } from "../../../models/info.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";

export const getYearlyInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const info = await InfoModel.findOne({});
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
    title: "Yearly Info fetched successfully",
    data: {
      name: info.nameOfMitsubishiHead,
      designation: info.designationOfMitsubhiHead,
      signature: info.signatureOfMitsubhiHead,
      email: info.emailOfMitsubishiHead,
      calendarLink: info.calenderLink,
    },
  });
};
