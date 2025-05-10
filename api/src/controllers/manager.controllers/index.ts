import { generateCertificate } from "../../template/generateCertificate";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { changeManagerStatusById } from "./query/changeManagerStatus.controller";
import { completeCollegeProfile } from "./query/completeCollegeProfile.controller";
import { editManagerById } from "./query/editMangerById.controller";
import { genereateCertificateController } from "./query/generateCertificate.controller";
import { getAllATCTraining } from "./query/getAllATCTraining.controller";
import { getAllManagers } from "./query/getAllManagers.controller";
import { getCollegeProfile } from "./query/getCollegeProfile.controller";
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
  getCollegeProfile: asyncWrapper(getCollegeProfile),
  completeCollegeProfile: asyncWrapper(completeCollegeProfile),
  getAllATCTraining: asyncWrapper(getAllATCTraining),
  genereateCertificateController: asyncWrapper(genereateCertificateController),
};
