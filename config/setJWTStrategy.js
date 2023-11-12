import { config } from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";

import User from "#models/user.js";

config();

const options = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const verify = async (payload, onVerified) => {
  try {
    const user = await User.findById(payload.id);

    if (!user) {
      throw new Error("User not found");
    }

    return onVerified(null, user);
  } catch (error) {
    return onVerified(error, false);
  }
};

export const setJWTStrategy = new Strategy(options, verify);
