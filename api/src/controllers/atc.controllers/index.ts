import { asyncWrapper } from "../../utils/asyncWrapper";
import { changeATCStatusByID } from "./query/changeATCStatusByID.controller";
import { createATC } from "./query/createATC.controller";
import { createTraining } from "./query/createTraining.controller";
import { editATCById } from "./query/editATCById.controller";
import { getAllATC } from "./query/getAllATC.controller";
import { getATCById } from "./query/getATCById.controller";

export const atcControllers = {
  createATC: asyncWrapper(createATC),
  getAllATC: asyncWrapper(getAllATC),
  changeStatus: asyncWrapper(changeATCStatusByID),
  getATCById: asyncWrapper(getATCById),
  editATCById: asyncWrapper(editATCById),
  createTraining: asyncWrapper(createTraining),
};
