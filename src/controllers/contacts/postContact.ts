import { Response, NextFunction } from "express";
import Contact from "@/models/contact";
import { AuthenticatedRequest, PostContactBody } from "@/types/custom";

export const postContact = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, phone, favorite } = req.body as PostContactBody;
  const userId = req.user?.id;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      favorite,
      owner: userId,
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      data: savedContact,
    });
  } catch (error) {
    next(error);
  }
};
