import { Response, NextFunction } from "express";
import Contact from "@/models/contact";
import { AuthenticatedRequest } from "@/types/custom";

export const deleteContact = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }

    res.status(200).json({
      message: "Contact deleted",
      data: { id: contactId },
    });
  } catch (error) {
    next(error);
  }
};
