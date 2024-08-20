import { Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({ message: `Whooops - Not Found ${req.path}` });
};

export const internalErrorHandler = (err: any, res: Response): void => {
  res
    .status(err.status || 500)
    .json({ message: err.message, status: err.status });
};
