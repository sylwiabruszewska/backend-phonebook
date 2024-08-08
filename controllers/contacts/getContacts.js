import Contact from "#models/contact.js";

export const getContacts = async (req, res, next) => {
  const { page = 1, limit = 5, favorite, query = "" } = req.query;
  const startIndex = (page - 1) * limit;
  const userId = req.user.id;

  try {
    const filter = {
      owner: userId,
      ...(favorite ? { favorite: true } : {}),
      ...(query ? { name: { $regex: query, $options: "i" } } : {}),
    };

    const [contacts, totalContacts] = await Promise.all([
      Contact.find(filter).skip(startIndex).limit(limit),
      Contact.countDocuments(filter),
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
