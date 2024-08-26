import { config } from "dotenv";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { User, IUser } from "@/models/user";

config();

const options: StrategyOptions = {
  secretOrKey: process.env.SECRET as string,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

interface JwtPayload {
  id: string;
}

type VerifiedCallback = (error: any, user?: IUser | false, info?: any) => void;

const verify = async (
  payload: JwtPayload,
  done: VerifiedCallback
): Promise<void> => {
  try {
    const user = await User.findById(payload.id).exec();

    if (!user) {
      return done(null, false);
    }

    return done(null, user as IUser);
  } catch (error) {
    return done(error as any, false);
  }
};

export const setJWTStrategy = new Strategy(options, verify);
