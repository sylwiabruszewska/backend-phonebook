import Contact from "#models/contact.js";
import { contactSchema, validateData } from "#validators/index.js";

export const postContact = async (req, res, next) => {
  try {
    const { isValid, errorMessage } = validateData(contactSchema, req.body);

    if (!isValid) {
      return res.status(400).json({
        message: errorMessage,
      });
    }

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
