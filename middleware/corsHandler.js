import cors from "cors";

export const corsHandler = (app) => {
  app.use(
    cors({
      origin: function (origin, callback) {
        callback(null, origin || "*");
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Authorization", "Content-Type"],
      exposedHeaders: ["Authorization"],
    })
  );
};
