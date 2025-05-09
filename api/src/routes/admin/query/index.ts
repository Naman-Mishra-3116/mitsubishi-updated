import { Router } from "express";
import controllers from "../../../controllers";
import { UploadFile } from "../../../middleware/multer.middleware";
import validateJWTToken from "../../../middleware/validateToken.middleware";
import { validateAccess } from "../../../middleware/validateAccess.middleware";

const mountAdminRouter = (router: Router) => {
  router.post("/adminLogin", controllers.adminController.adminLogin);

  router.post(
    "/createAdmin",
    validateJWTToken,
    UploadFile.single("profileImage"),
    controllers.adminController.creatAdmin
  );

  router.get(
    "/loginData",
    validateJWTToken,
    validateAccess("admin"),
    controllers.adminController.getAdminLoginData
  );

  router.get(
    "/profileFormData",
    validateJWTToken,
    controllers.adminController.getAdminProfileFormData
  );

  router.get(
    "/profileViewData",
    validateJWTToken,
    controllers.adminController.getAdminProfileViewData
  );

  router.post(
    "/completeProfile",
    validateJWTToken,
    controllers.adminController.completeProfileForm
  );

  router.post(
    "/updateProfilePic",
    validateJWTToken,
    UploadFile.single("profilePic"),
    controllers.adminController.updateAdminProfilePic
  );

  router.get(
    "/allAdmins",
    validateJWTToken,
    controllers.adminController.getAllAdmin
  );

  router.post(
    "/updateStatus/:id",
    validateJWTToken,
    controllers.adminController.changeAdminStatusById
  );

  router.get(
    "/dashboard",
    validateJWTToken,
    controllers.adminController.dashboardStats
  );

  router.get(
    "/viewAll",
    validateJWTToken,
    controllers.adminController.viewAllTraining
  );

  router.post(
    "/approve/:id",
    validateJWTToken,
    controllers.adminController.approveTrainingById
  );

  router.get(
    "/training/:id",
    validateJWTToken,
    controllers.adminController.getATCSpecificTraining
  );

  router.post(
    "/yearlyInfo",
    validateJWTToken,
    UploadFile.fields([
      { name: "signature", maxCount: 1 },
      { name: "calendar", maxCount: 1 },
    ]),
    controllers.adminController.createEditYearlyInformation
  );

  router.get(
    "/info",
    validateJWTToken,
    controllers.adminController.getYearlyInfo
  );
};

export default mountAdminRouter;
