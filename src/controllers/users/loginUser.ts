import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";

import { User } from "@/models/user";

config();
const secret = process.env.SECRET;

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Invalid email or password",
      });
      return;
    }

    const isPasswordValid = await user.validPassword(password);

    if (!user.verify) {
      res.status(403).json({
        status: "Forbidden",
        code: 403,
        message: "Email not verified",
      });
      return;
    }

    if (!isPasswordValid) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Invalid email or password",
      });
      return;
    }

    const { id, name } = user;
    const token = jwt.sign({ id }, secret as string, { expiresIn: "12h" });

    await User.findByIdAndUpdate(user.id, { token });

    res.status(200).json({
      status: "OK",
      code: 200,
      token: token,
      data: {
        user: {
          name: name,
          email: email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
