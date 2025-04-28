import { Router } from "express";
import controllers from "../../../controllers";
import validateJWTToken from "../../../middleware/validateToken.middleware";

export const mountGeneralRoutes = (router: Router) => {
  router.get("/mapData", controllers.generalControllers.getMapData);
  router.get("/sliderData", controllers.generalControllers.getSliderData);
  router.get("/centers", controllers.generalControllers.getAllCenters);

  router.post(
    "/logout",
    validateJWTToken,
    controllers.generalControllers.logoutUser
  );

  router.get(
    "/:trainingId",
    validateJWTToken,
    controllers.generalControllers.getTrainingDataByID
  );
};
