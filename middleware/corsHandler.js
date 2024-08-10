import cors from "cors";

const corsOrigin = process.env.CORS_ORIGIN || process.env.CORS_ORIGIN_LOCAL;

export const corsHandler = (app) => {
  app.use(
    cors({
      origin: corsOrigin,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Authorization", "Content-Type"],
      exposedHeaders: ["Authorization"],
    })
  );
};
