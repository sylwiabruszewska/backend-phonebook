import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { IUser } from "@/models/user";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: IUser | false) => {
      if (err || !user) {
        return res.status(401).json({
          status: "Unauthorized",
          code: 401,
          message: "Not authorized.",
        });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};
