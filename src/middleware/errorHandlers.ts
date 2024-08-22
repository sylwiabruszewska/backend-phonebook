import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({ message: `Whooops - Not Found ${req.path}` });
};

export const internalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    status: err.status || "Error",
  });
};
