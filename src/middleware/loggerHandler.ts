import logger from "morgan";
import { Express } from "express";

export const loggerHandler = (app: Express): void => {
  const formatsLogger = app.get("env") === "development" ? "dev" : "short";
  app.use(logger(formatsLogger));
};
