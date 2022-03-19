import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

function loadEnvs(): void {
  if (fs.existsSync(".env")) {
    dotenv.config({ path: ".env" });
    logger.debug("Environment variables loaded from `.env` file");
  } else {
    dotenv.config({ path: "env-reference" });
    logger.debug("Environment variables loaded from `env-reference` file");
  }
}

export default loadEnvs;
