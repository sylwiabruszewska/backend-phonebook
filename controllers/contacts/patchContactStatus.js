import Contact from "#models/contact.js";

export const patchContactStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (typeof favorite !== "boolean") {
      return res.status(400).json({
        message: "Field 'favorite' must be a boolean",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json({
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
