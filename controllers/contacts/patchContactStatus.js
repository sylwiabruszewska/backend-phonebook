import Contact from "#models/contact.js";

export const patchContactStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (!favorite) {
      res.status(400).json({
        message: "missing field favorite",
      });
      return;
    }

    const contact = await Contact.findByIdAndUpdate(contactId, { favorite });

    contact.favorite = favorite;

    res.status(200).json({
      data: contact,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
