import { Request, Response, NextFunction } from "express";
import { ErrorResponse, ErrorType } from "../utils/customError";
import { jsonResponse } from "../utils/jsonResponse";
import { TServerResponse } from "../types/response";

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const responseBody: TServerResponse<null> = {
    status: "error",
    statusCode: 500,
    message: err.message,
    title: err.title,
  };

  if (err.errorType === ErrorType.EXPIRED_TOKEN) {
    responseBody.statusCode = 401;
    responseBody.message = "Token Expired, Login to continue";
    responseBody.title = "Unauthorized User";
  }

  if (err.errorType === ErrorType.INVALID_TOKEN) {
    responseBody.statusCode = 401;
    responseBody.message = "Unauthorized User, Invalid Token";
    responseBody.title = "Invalid token";
  }

  if (err.errorType === ErrorType.INTERNAL_ERROR) {
    responseBody.statusCode = 500;
    responseBody.message = "Server error, Please try again later !";
    responseBody.title = "Internal Sever Error";
  }

  if (err.errorType === ErrorType.BAD_REQUEST) {
    responseBody.statusCode = 400;
  }

  jsonResponse(res, responseBody);
};
