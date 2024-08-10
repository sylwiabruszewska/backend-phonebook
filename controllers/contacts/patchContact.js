import Contact from "#models/contact.js";

export const patchContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedData = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      status: "OK",
      code: 200,
      data: updatedContact,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
