import express from "express";
import dotenv from "dotenv";
import { serve, setup } from "swagger-ui-express";
import swaggerDoc from "./swagger.json" assert { type: "json" };

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

app.use(express.static("public"));

app.use("/api", apiRouter);
app.use("/doc", serve, setup(swaggerDoc));

app.use(notFoundHandler);
app.use(internalErrorHandler);

export { app };
