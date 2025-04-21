import { asyncWrapper } from "../../utils/asyncWrapper";
import { getAllCenters } from "./query/getAllCenters.controller";
import { getMapData } from "./query/getMapData.controller";
import { getSliderData } from "./query/getSliderData.controller";
import logout from "./query/logout.controller";

export const generalControllers = {
  getMapData: asyncWrapper(getMapData),
  getSliderData: asyncWrapper(getSliderData),
  getAllCenters: asyncWrapper(getAllCenters),
  logoutUser: asyncWrapper(logout),
};
