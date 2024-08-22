import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

import { User } from "@/models/user";
import { sendVerificationMail } from "@/helpers/sendVerificationMail";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      if (!user.verify) {
        res.status(409).json({
          status: "Conflict",
          code: 409,
          message:
            "Email is already registered but not verified. Please verify your email.",
        });
        return;
      }
      res.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email is already in use",
      });
      return;
    }

    const verificationToken = uuidv4();

    const newUser = new User({ name, email, verificationToken });

    await newUser.setPassword(password);
    await newUser.save();

    await sendVerificationMail({ userEmail: email, verificationToken });

    res.status(201).json({
      status: "Created",
      code: 201,
      data: { name, email, verificationToken },
    });
  } catch (error) {
    next(error);
  }
};
