import { Response } from "express";
import { TServerResponse } from "../types/response";

export const jsonResponse = <T>(
  res: Response,
  body: TServerResponse<T>
): Response => {
  res.status(body.statusCode);
  return res.json({
    status: body.status,
    message: body.message,
    data: body.data,
    title: body.title,
    error: body.error,
  });
};
