import { Application, Router } from "express";
import { CommonRoutesConfig } from "../common.routes";
import mountAdminRouter from "./query/index";

export class AdminRoutes extends CommonRoutesConfig {
  public constructor(app: Application) {
    super("admin", app);
    this.app.use(`/api/v1/${this.name}`, this.router);
  }

  public configRoute(router: Router): Application {
    mountAdminRouter(router);
    return this.app;
  }
}
