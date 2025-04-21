import { Application, Router } from "express";
import { CommonRoutesConfig } from "../common.routes";
import mountATCRouter from "./query/index";

export class ATCRoutes extends CommonRoutesConfig {
  public constructor(app: Application) {
    super("atc", app);
    this.app.use(`/api/v1/${this.name}`, this.router);
  }

  public configRoute(router: Router): Application {
    mountATCRouter(router);
    return this.app;
  }
}
