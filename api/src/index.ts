import loadEnvs from "./utils/secrets";
loadEnvs();

import errorHandler from "errorhandler";
import compression from "compression";
import cors from "cors";
import express from "express";
import lusca from "lusca";
import setBaseRouter from "./routes";
import logger from "./utils/logger";
import { databaseConnect } from "./config/database";

const app = express();

app.use(compression());
app.use(cors({ origin: process.env["ALLOWED_HOSTS"] }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

setBaseRouter(app);

databaseConnect();

const PORT = process.env["PORT"] || 8000;
app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
