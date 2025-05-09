import { asyncWrapper } from "../../utils/asyncWrapper";
import adminLogin from "./query/adminLogin.controller";
import { adminProfilePicUpload } from "./query/adminProfilePicUpload.controller";
import { approveTrainingById } from "./query/approveTraining.controller";
import { changeAdminStatusByID } from "./query/changeAdminStatus.controller";
import completeProfileForm from "./query/completeProfile.controller";
import createAdminUser from "./query/createAdmin.controller";
import { createEditYearlyInformation } from "./query/createEditYearlyInformation.controller";
import getAdminLoginData from "./query/getAdminLoginData.controller";
import getAdminProfileFormData from "./query/getAdminProfileFormData.controller";
import getAdminProfileViewData from "./query/getAdminProfileViewData.controller";
import { getAllAdmins } from "./query/getAllAdmins.controller";
import { getATCSpecificTraining } from "./query/getATCSpecificTraining.controller";
import { getAllDashBoardData } from "./query/getDashBoardData.controller";
import { getYearlyInfo } from "./query/getYearlyInfo.controller";
import { viewAllTraining } from "./query/viewAllTraining.controller";

export const adminController = {
  creatAdmin: asyncWrapper(createAdminUser),
  adminLogin: asyncWrapper(adminLogin),
  getAdminLoginData: asyncWrapper(getAdminLoginData),
  getAdminProfileFormData: asyncWrapper(getAdminProfileFormData),
  getAdminProfileViewData: asyncWrapper(getAdminProfileViewData),
  completeProfileForm: asyncWrapper(completeProfileForm),
  updateAdminProfilePic: asyncWrapper(adminProfilePicUpload),
  getAllAdmin: asyncWrapper(getAllAdmins),
  changeAdminStatusById: asyncWrapper(changeAdminStatusByID),
  dashboardStats: asyncWrapper(getAllDashBoardData),
  approveTrainingById: asyncWrapper(approveTrainingById),
  viewAllTraining: asyncWrapper(viewAllTraining),
  getATCSpecificTraining: asyncWrapper(getATCSpecificTraining),
  createEditYearlyInformation: asyncWrapper(createEditYearlyInformation),
  getYearlyInfo: asyncWrapper(getYearlyInfo),
};
