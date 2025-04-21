import { Request, Response, NextFunction } from "express";
import { CollegeModel } from "../../../models/college.model";
import { jsonResponse } from "../../../utils/jsonResponse";

export const getMapData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await CollegeModel.find(
    {},
    { collegeName: 1, latitude: 1, longitude: 1, collegeCity: 1, _id: 1 }
  );

  const mapData = data.map((item) => {
    return {
      name: item.collegeName,
      city: item.collegeCity,
      coordinates: [item.longitude, item.latitude],
    };
  });

  jsonResponse(res, {
    status: "success",
    statusCode: 201,
    data: mapData,
    title: "Map data delivered successfully!",
  });
};
