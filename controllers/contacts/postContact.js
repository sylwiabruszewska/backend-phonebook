import Contact from "#models/contact.js";

export const postContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);

    res.status(201).json({
      data: newContact,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
