import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "@/types/custom";

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email } = req.user!;

  res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};
