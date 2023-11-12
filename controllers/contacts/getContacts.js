import Contact from "#models/contact.js";

export const getContacts = async (req, res, next) => {
  const { page = 1, limit = 20 } = req.query;
  const startIndex = (page - 1) * limit;

  try {
    const [contacts, totalContacts] = await Promise.all([
      Contact.find().skip(startIndex).limit(limit),
      Contact.countDocuments(),
    ]);
    const totalPages = Math.ceil(totalContacts / limit);

    res.status(200).json({
      data: contacts,
      total: totalContacts,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
