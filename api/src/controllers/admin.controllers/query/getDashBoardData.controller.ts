import { Request, Response, NextFunction } from "express";
import { jsonResponse } from "../../../utils/jsonResponse";
import { AdminUser } from "../../../models/adminUser.model";
import { ATC } from "../../../models/atc.model";
import { Training } from "../../../models/training.model";

export const getAllDashBoardData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [totalAdmins, [atcData], [studentData]] = await Promise.all([
    AdminUser.countDocuments(),

    ATC.aggregate([
      {
        $facet: {
          totalATCs: [{ $count: "count" }],
          totalTrainings: [
            {
              $group: {
                _id: null,
                count: { $sum: { $size: "$trainings" } },
              },
            },
          ],
        },
      },
      {
        $project: {
          totalATCs: { $arrayElemAt: ["$totalATCs.count", 0] },
          totalTrainings: { $arrayElemAt: ["$totalTrainings.count", 0] },
        },
      },
    ]),

    Training.aggregate([
      {
        $group: {
          _id: null,
          totalStudents: { $sum: "$totalStudents" },
        },
      },
    ]),
  ]);

  return jsonResponse(res, {
    title: "Data fetchd",
    status: "success",
    statusCode: 200,
    data: {
      totalAdmins,
      totalATCs: atcData?.totalATCs || 0,
      totalTrainings: atcData?.totalTrainings || 0,
      totalStudents: studentData?.totalStudents || 0,
    },
  });
};
