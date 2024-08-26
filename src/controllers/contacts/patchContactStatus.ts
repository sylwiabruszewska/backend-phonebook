import { Response, NextFunction } from "express";
import Contact from "@/models/contact";
import { AuthenticatedRequest, PatchContactStatusBody } from "@/types/custom";

export const patchContactStatus = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body as PatchContactStatusBody;

    if (typeof favorite !== "boolean") {
      res.status(400).json({
        message: "Field 'favorite' must be a boolean",
      });
      return;
    }

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!contact) {
      res.status(404).json({
        message: "Contact not found",
      });
      return;
    }

    res.status(200).json({
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
