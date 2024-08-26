import cors from "cors";
import { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

export const corsHandler = (app: Express): void => {
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : [];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) {
          callback(new Error("No origin provided"));
          return;
        }

        if (allowedOrigins.includes(origin)) {
          callback(null, origin);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Authorization", "Content-Type"],
      exposedHeaders: ["Authorization"],
    })
  );
};
