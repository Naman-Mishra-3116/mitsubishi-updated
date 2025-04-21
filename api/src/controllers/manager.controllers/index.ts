import { asyncWrapper } from "../../utils/asyncWrapper";
import { changeManagerStatusById } from "./query/changeManagerStatus.controller";
import { editManagerById } from "./query/editMangerById.controller";
import { getAllManagers } from "./query/getAllManagers.controller";
import { getManagerByATCId } from "./query/getManagerByATCId.controller";
import { getManagerLoginData } from "./query/getManagerData.controller";
import { managerLogin } from "./query/mangerLogin.controller";

export const managerControllers = {
  getManagerById: asyncWrapper(getManagerByATCId),
  editManagerById: asyncWrapper(editManagerById),
  managerLogin: asyncWrapper(managerLogin),
  getAllManagers: asyncWrapper(getAllManagers),
  changeManagerStatusById: asyncWrapper(changeManagerStatusById),
  getManagerLoginData: asyncWrapper(getManagerLoginData),
};
