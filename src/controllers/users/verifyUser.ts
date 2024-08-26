import { Request, Response, NextFunction } from "express";
import { User } from "@/models/user";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const verificationToken = req.params.verificationToken;

  try {
    const user = await User.findOneAndUpdate(
      { verificationToken },
      {
        verificationToken: " ",
        verify: true,
      }
    );

    if (!user) {
      res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};
