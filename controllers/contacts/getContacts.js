import Contact from "#models/contact.js";

export const getContacts = async (req, res, next) => {
  const { page = 1, limit = 20, favorite } = req.query;
  const startIndex = (page - 1) * limit;

  try {
    const setFavorite = favorite ? { favorite: true } : {};

    const [contacts, totalContacts] = await Promise.all([
      Contact.find(setFavorite).skip(startIndex).limit(limit),
      Contact.countDocuments(setFavorite),
    ]);

    const totalPages = Math.ceil(totalContacts / limit);
    const currentPage = parseInt(page);

    res.status(200).json({
      data: contacts,
      total: totalContacts,
      totalPages,
      currentPage,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
