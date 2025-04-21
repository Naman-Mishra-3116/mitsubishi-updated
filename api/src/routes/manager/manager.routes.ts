import { Application, Router } from "express";
import { CommonRoutesConfig } from "../common.routes";
import { mountManagerRouter } from "./query";

export class ManagerRoutes extends CommonRoutesConfig {
  public constructor(app: Application) {
    super("manager", app);
    this.app.use(`/api/v1/${this.name}`, this.router);
  }

  public configRoute(router: Router): Application {
    mountManagerRouter(router);
    return this.app;
  }
}
