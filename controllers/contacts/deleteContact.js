import Contact from "#models/contact.js";

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await Contact.findByIdAndDelete(contactId);

    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
