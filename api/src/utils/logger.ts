import winston from "winston";

const isRealEnvironment =
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "homologation";

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: isRealEnvironment ? "error" : "debug",
    }),
    new winston.transports.File({ filename: "debug.log", level: "debug" }),
  ],
};

const logger = winston.createLogger(options);

if (!isRealEnvironment) {
  logger.debug("Logging initialized at debug level");
}

export default logger;
