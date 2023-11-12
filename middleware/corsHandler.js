import cors from "cors";

export const corsHandler = (app) => {
  app.use(cors());
};
