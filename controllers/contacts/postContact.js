import Contact from "#models/contact.js";
import { contactSchema, validateData } from "#validators/index.js";

export const postContact = async (req, res, next) => {
  const requiredFields = ["name", "email", "phone"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({
        message: `Missing required ${field} field`,
      });
    }
  }

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
