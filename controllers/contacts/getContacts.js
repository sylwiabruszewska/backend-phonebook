import Contact from "#models/contact.js";

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json({
      data: contacts,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
