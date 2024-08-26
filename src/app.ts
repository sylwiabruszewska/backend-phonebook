import express from "express";
import { Express } from "express";
import dotenv from "dotenv";
import { serve, setup } from "swagger-ui-express";
import swaggerDoc from "@/swagger.json";

import { apiRouter } from "@/routes/api/api";
import { notFoundHandler } from "@/middleware/errorHandlers";
import { internalErrorHandler } from "@/middleware/errorHandlers";
import { loggerHandler } from "@/middleware/loggerHandler";
import { corsHandler } from "@/middleware/corsHandler";
import { bodyParserHandler } from "@/middleware/bodyParserHandler";
import { passportHandler } from "@/middleware/passportHandler";

dotenv.config();

const app: Express = express();

loggerHandler(app);
corsHandler(app);
bodyParserHandler(app);
passportHandler(app);

app.use("/api", apiRouter);
app.use("/doc", serve, setup(swaggerDoc));

app.use(notFoundHandler);
app.use(internalErrorHandler);

export { app };
