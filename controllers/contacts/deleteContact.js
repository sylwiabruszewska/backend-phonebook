import Contact from "#models/contact.js";

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      message: "Contact deleted",
      data: { id: contactId },
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
