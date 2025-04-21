import { Router, Application } from "express";
import { CommonRoutesConfig } from "../common.routes";
import { mountGeneralRoutes } from "./query";

export class GeneralRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super("general", app);
    this.app.use(`/api/v1/${this.name}`, this.router);
  }
  public configRoute(router: Router): Application {
    mountGeneralRoutes(this.router);
    return this.app;
  }
}
