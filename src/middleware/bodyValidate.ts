import { Request, Response, NextFunction } from "express";
import { validateData } from "@/helpers/validateData";

export const bodyValidate = (validator: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { isValid, errorMessage, invalidParam } = validateData(
      validator,
      req.body
    );

    if (!isValid) {
      res.status(400).json({
        message: errorMessage,
        invalidParam,
      });
      return;
    }

    return next();
  };
};
