import { Request, Response } from "express";
import { AdminUser } from "../../../models/adminUser.model";
import { paginationService } from "../../../services/paginationService";
import { jsonResponse } from "../../../utils/jsonResponse";

export const getAllAdmins = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) ?? 1;
  const limit = parseInt(req.query.limit as string) ?? 5;

  const data = await paginationService(AdminUser, page, limit, [
    {
      $project: {
        fullName: 1,
        email: 1,
        role: 1,
        phoneNumber: 1,
        permission: 1,
        isBlocked: 1,
        city: 1,
        state: 1,
      },
    },
  ]);
  return jsonResponse(res, {
    data,
    message: "Data fetched",
    title: "Admins fetched",
    status: "success",
    statusCode: 200,
  });
};
