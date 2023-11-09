import Contact from "#models/contact.js";

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    res.status(200).json({
      data: contact,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
