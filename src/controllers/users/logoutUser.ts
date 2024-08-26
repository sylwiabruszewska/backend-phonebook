import { Response, NextFunction } from "express";
import { User } from "@/models/user";
import { AuthenticatedRequest } from "@/types/custom";

export const logoutUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await User.findByIdAndUpdate(req.user?.id, { token: null });

    if (!result) {
      res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "User not found",
      });
    }

    req.user = null;

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
