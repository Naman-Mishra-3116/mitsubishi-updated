import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import Config from "./config/config";
import { errorHandler } from "./middleware/errorHandler";
import { AdminRoutes } from "./routes/admin/admin.routes";
import { ATCRoutes } from "./routes/atc/atc.routes";
import { CommonRoutesConfig } from "./routes/common.routes";
import path from "path";
import { ManagerRoutes } from "./routes/manager/manager.routes";
import { GeneralRoutes } from "./routes/general/general.routes";
import "./crons/serverCleanerCron.cron";
config();

const app: Express = express();
const port = process.env.PORT ?? 8000;
const backendUrl = process.env.BACKEND_URI?.replace("PORT", port.toString());
const routes: Array<CommonRoutesConfig> = [];

app.use(
  cors({
    credentials: true,
    origin: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: "GET,POST,PUT,PATCH,UPDATE,DELETE",
  })
);

const uploadsPath = path.resolve(__dirname, "..", "..", "uploads");

app.use("/uploads", express.static(uploadsPath));
app.use(cookieParser(process.env.COOKIE_SECRET ?? "aVerySecretCookie"));
// app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes.push(new ATCRoutes(app));
routes.push(new AdminRoutes(app));
routes.push(new ManagerRoutes(app));
routes.push(new GeneralRoutes(app));

app.use(errorHandler);

new Config().start().then((data) => {
  app.listen(port, () => {
    const tableData = [
      { Name: data.name.toUpperCase(), URL: data.URL },
      { Name: "API", URL: backendUrl },
      ...routes.map((route) => ({
        Name: route.name.toUpperCase(),
        URL: `${backendUrl}${route.name}`,
      })),
    ];
    console.table(tableData);
  });
});
