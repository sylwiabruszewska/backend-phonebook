import express from "express";
import dotenv from "dotenv";

import { apiRouter } from "#routes/api/api.js";
import {
  notFoundHandler,
  internalErrorHandler,
  loggerHandler,
  corsHandler,
  bodyParserHandler,
  passportHandler,
} from "#middleware/index.js";

dotenv.config();

const app = express();

loggerHandler(app);
corsHandler(app);
bodyParserHandler(app);
passportHandler(app);

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(internalErrorHandler);

export { app };
