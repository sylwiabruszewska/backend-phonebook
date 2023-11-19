import passport from "passport";
import { setJWTStrategy } from "#config/setJWTStrategy.js";

export const passportHandler = (app) => {
  passport.use(setJWTStrategy);
};
