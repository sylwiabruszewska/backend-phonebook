import logger from "morgan";

export const loggerHandler = (app) => {
  const formatsLogger = app.get("env") === "development" ? "dev" : "short";
  app.use(logger(formatsLogger));
};
