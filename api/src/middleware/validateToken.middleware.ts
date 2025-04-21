import { NextFunction, Request, Response } from "express";
import { JwtConfig } from "../config/jwtConfig";
import { ErrorResponse, ErrorType } from "../utils/customError";

const validateJWTToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies.token;
  const decodedData = JwtConfig.verifyToken(token);

  if (!decodedData) {
    return next(
      new ErrorResponse(
        ErrorType.INVALID_TOKEN,
        "Inavlid token",
        "Please login to continue"
      )
    );
  }

  res.locals.userData = decodedData;
  next();
};

export default validateJWTToken;
