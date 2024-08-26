import { Response, NextFunction } from "express";
import Contact from "@/models/contact";
import { AuthenticatedRequest } from "@/types/custom";

export const getContactById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }

    res.status(200).json({
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
