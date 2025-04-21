import { NextFunction, Request, Response } from "express";
import { ATCManager } from "../../../models/manager.model";
import bcrypt from "bcryptjs";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { jsonResponse } from "../../../utils/jsonResponse";

export const editManagerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { managerName, managerEmail, managerPassword, phoneNumber } = req.body;

  const existing = await ATCManager.findOne({
    _id: { $ne: id },
    $or: [{ managerEmail }, { phoneNumber }],
  });

  if (existing) {
    return next(
      new ErrorResponse(
        ErrorType.BAD_REQUEST,
        "This manager is already associated to some other ATC. Pleaes specify a different one",
        "Manager Already associated to other ATC"
      )
    );
  }

  const hashedPassword = await bcrypt.hash(managerPassword, 5);
  const manager = await ATCManager.findByIdAndUpdate(
    id,
    {
      name: managerName,
      email: managerEmail,
      password: hashedPassword,
      phoneNumber,
      dataChanged: true,
    },
    { new: true }
  );

  if (!manager) {
    return next(
      new ErrorResponse(
        ErrorType.NOT_FOUND,
        "Manager not found",
        "Manger not found"
      )
    );
  }

  return jsonResponse(res, {
    title: "Manger Updated successfully!",
    status: "success",
    statusCode: 200,
  });
};
