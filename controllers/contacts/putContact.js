import Contact from "#models/contact.js";
import { contactSchema, validateData } from "#validators/index.js";

export const putContact = async (req, res, next) => {
  const { params, body } = req;
  const { contactId } = params;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "missing fields",
    });
    return;
  }

  try {
    const { isValid, errorMessage } = validateData(contactSchema, req.body);

    if (!isValid) {
      return res.status(400).json({
        message: errorMessage,
      });
    }

    await Contact.findByIdAndUpdate(contactId, body);

    res.status(200).json({
      data: { contactId, ...body },
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
