import { Application, Router } from "express";

/**
 * @class this class is meant for imposing standards for the router configuration for each router
 * @method configRoute mounts the router with the controllers
 */
export abstract class CommonRoutesConfig {
  public name: string;
  public app: Application;
  public router: Router;
  public constructor(name: string, app: Application) {
    this.name = name;
    this.app = app;
    this.router = Router();
    this.configRoute(this.router);
  }

  /**
   * @method for mounting the router with the specific controllers
   * @param router
   * @returns the express application instance.
   */
  public abstract configRoute(router: Router): Application;
}
