import { asyncWrapper } from "../../utils/asyncWrapper";
import { getAllCenters } from "./query/getAllCenters.controller";
import { getCalendar } from "./query/getCalendar.controller";
import { getMapData } from "./query/getMapData.controller";
import { getSliderData } from "./query/getSliderData.controller";
import { getTrainingDataByID } from "./query/getTrainingDataByID.controller";
import logout from "./query/logout.controller";

export const generalControllers = {
  getMapData: asyncWrapper(getMapData),
  getSliderData: asyncWrapper(getSliderData),
  getAllCenters: asyncWrapper(getAllCenters),
  logoutUser: asyncWrapper(logout),
  getTrainingDataByID: asyncWrapper(getTrainingDataByID),
  getCalendar: asyncWrapper(getCalendar),
};
