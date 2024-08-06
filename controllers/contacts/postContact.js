import Contact from "#models/contact.js";

export const postContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const userId = req.user.id;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      favorite,
      owner: userId,
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      data: savedContact,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
