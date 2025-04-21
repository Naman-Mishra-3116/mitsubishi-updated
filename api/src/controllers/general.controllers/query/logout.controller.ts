import { Request, Response } from "express";
import { jsonResponse } from "../../../utils/jsonResponse";

const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", { signed: true, httpOnly: true });
  return jsonResponse(res, {
    title: "Logout successfully!",
    status: "success",
    message: "Logged out successfully",
    statusCode: 200,
  });
};

export default logout;
