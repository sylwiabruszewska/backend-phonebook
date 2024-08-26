import { Response, NextFunction } from "express";
import Contact from "@/models/contact";
import {
  ContactDocument,
  ContactData,
  AuthenticatedRequest,
} from "@/types/custom";

export const patchContact = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { contactId } = req.params;
  const updatedData = req.body as ContactData;

  try {
    const updatedContact = (await Contact.findByIdAndUpdate(
      contactId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    )) as ContactDocument;

    if (!updatedContact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }

    res.status(200).json({
      status: "OK",
      code: 200,
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};
