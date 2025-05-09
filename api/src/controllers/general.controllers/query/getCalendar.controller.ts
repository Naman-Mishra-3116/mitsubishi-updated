import { Request, Response, NextFunction } from "express";
import { InfoModel } from "../../../models/info.model";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";

export const getCalendar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const info = await InfoModel.findOne({});
    if (!info) {
      return next(
        new ErrorResponse(
          ErrorType.BAD_REQUEST,
          "Could not retreive calendar",
          "This request could not be processed at this time"
        )
      );
    }

    console.log(info, "this is info");
    return jsonResponse(res, {
      status: "success",
      statusCode: 200,
      title: "Calendar fetched successfully",
      data: {
        calendarLink: info?.calenderLink,
      },
    });
  } catch (error) {
    console.log(error, "error is this");
  }
};
