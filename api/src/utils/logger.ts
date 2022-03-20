import winston from "winston";

const isProductionEnv = process.env.NODE_ENV === "production";

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: isProductionEnv ? "error" : "debug",
    }),
    new winston.transports.File({ filename: "debug.log", level: "debug" }),
  ],
};

const logger = winston.createLogger(options);

if (!isProductionEnv) {
  logger.debug("Logging initialized at debug level");
}

export default logger;
