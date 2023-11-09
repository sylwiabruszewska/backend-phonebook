import Contact from "#models/contact.js";

export const putContact = async (req, res, next) => {
  try {
    const { params, body } = req;
    const { contactId } = params;

    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        message: "missing fields",
      });
      return;
    }

    const { error } = Contact.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
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
