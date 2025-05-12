import { Router } from "express";
import validateJWTToken from "../../../middleware/validateToken.middleware";
import controllers from "../../../controllers";
import { validateAccess } from "../../../middleware/validateAccess.middleware";
import { UploadFile } from "../../../middleware/multer.middleware";
import { managerControllers } from "../../../controllers/manager.controllers";

export const mountManagerRouter = (router: Router) => {
  router.get(
    "/atcID",
    validateJWTToken,
    controllers.managerControllers.getManagerById
  );
  router.get(
    "/",
    validateJWTToken,
    controllers.managerControllers.getAllManagers
  );
  router.post(
    "/edit/:id",
    validateJWTToken,
    controllers.managerControllers.editManagerById
  );

  router.post(
    "/status/:id",
    validateJWTToken,
    controllers.managerControllers.changeManagerStatusById
  );

  router.post("/login", controllers.managerControllers.managerLogin);

  router.get(
    "/loginData",
    validateJWTToken,
    validateAccess("managers"),
    controllers.managerControllers.getManagerLoginData
  );

  router.post(
    "/completeProfile",
    validateJWTToken,
    UploadFile.fields([
      { name: "collegeLogo", maxCount: 1 },
      { name: "managerSignature", maxCount: 1 },
      { name: "hodSignature", maxCount: 1 },
    ]),

    controllers.managerControllers.completeCollegeProfile
  );

  router.get(
    "/collegeProfile",
    validateJWTToken,
    controllers.managerControllers.getCollegeProfile
  );

  router.get(
    "/allTraining",
    validateJWTToken,
    controllers.managerControllers.getAllATCTraining
  );

  router.post(
    "/certificate/:trainingId",
    validateJWTToken,
    controllers.managerControllers.genereateCertificateController
  );

  router.get(
    "/dashboard",
    validateJWTToken,
    controllers.managerControllers.getATCDashboard
  );
};
