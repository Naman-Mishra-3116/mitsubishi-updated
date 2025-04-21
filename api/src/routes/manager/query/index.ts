import { Router } from "express";
import validateJWTToken from "../../../middleware/validateToken.middleware";
import controllers from "../../../controllers";
import { validateAccess } from "../../../middleware/validateAccess.middleware";

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
};
