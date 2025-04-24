import { Router } from "express";
import validateJWTToken from "../../../middleware/validateToken.middleware";
import controllers from "../../../controllers";
import { UploadFile } from "../../../middleware/multer.middleware";

const mountATCRouter = (router: Router) => {
  router.post(
    "/createATC",
    validateJWTToken,
    UploadFile.single("atcImage"),
    controllers.atcControllers.createATC
  );
  router.get("/allATC", validateJWTToken, controllers.atcControllers.getAllATC);

  router.post(
    "/updateStatus/:id",
    validateJWTToken,
    controllers.atcControllers.changeStatus
  );

  router.post(
    "/updateStatus/:id",
    validateJWTToken,
    controllers.atcControllers.changeStatus
  );

  router.post(
    "/edit/:id",
    validateJWTToken,
    UploadFile.single("atcImage"),
    controllers.atcControllers.editATCById
  );

  router.get("/:id", validateJWTToken, controllers.atcControllers.getATCById);

  router.post(
    "/createTraining",
    UploadFile.fields([
      { name: "trainingImages", maxCount: 5 },
      { name: "attendence", maxCount: 1 },
    ]),
    controllers.atcControllers.createTraining
  );
};
export default mountATCRouter;
