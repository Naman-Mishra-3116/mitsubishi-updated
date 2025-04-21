import { NextFunction, Request, Response } from "express";
import { AdminUser } from "../models/adminUser.model";
import mongoose from "mongoose";
import { ErrorResponse, ErrorType } from "../utils/customError";
import { ATCManager } from "../models/manager.model";

export const validateAccess = (name: "admin" | "managers") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = res.locals.userData;

    if (name === "admin") {
      const admin = await AdminUser.findById(new mongoose.Types.ObjectId(id));

      if (admin && admin.isBlocked) {
        res.clearCookie("token");
        return next(
          new ErrorResponse(
            ErrorType.BAD_REQUEST,
            "Access Denied",
            "Your access to this application has been blocked. Contact Senior Admin"
          )
        );
      }
    }

    if (name === "managers") {
      const manager = await ATCManager.findById(
        new mongoose.Types.ObjectId(id)
      );
      if (manager && manager.dataChanged) {
        manager.dataChanged = false;
        await manager.save();
        res.clearCookie("token");
        return next(
          new ErrorResponse(
            ErrorType.BAD_REQUEST,
            "Please Login to Continue",
            "Your ATC Data has been changed by the admin please login again to continue"
          )
        );
      }

      if (manager && !manager.active) {
        res.clearCookie("token");
        return next(
          new ErrorResponse(
            ErrorType.BAD_REQUEST,
            "Access Denied",
            "Your access to this application has been blocked. Contact Senior Admin"
          )
        );
      }
    }

    next();
  };
};
