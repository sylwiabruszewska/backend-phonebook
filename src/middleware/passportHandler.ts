import passport from "passport";
import { Express } from "express";

import { setJWTStrategy } from "@/config/setJWTStrategy";

export const passportHandler = (app: Express): void => {
  passport.use(setJWTStrategy);
};
