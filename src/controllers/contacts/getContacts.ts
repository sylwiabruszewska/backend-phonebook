import { Response, NextFunction } from "express";
import Contact from "@/models/contact";
import { AuthenticatedRequest, GetContactsQuery } from "@/types/custom";

export const getContacts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.id;
  const {
    page = "1",
    limit = "10",
    favorite,
    query = "",
  } = req.query as GetContactsQuery;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  if (isNaN(pageNumber) || isNaN(limitNumber)) {
    res.status(400).json({
      message: "Page and limit must be valid numbers",
    });
  }

  const startIndex = (pageNumber - 1) * limitNumber;

  try {
    const filter = {
      owner: userId,
      ...(favorite ? { favorite: true } : {}),
      ...(query ? { name: { $regex: query, $options: "i" } } : {}),
    };

    const [contacts, totalContacts] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limitNumber),
      Contact.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalContacts / limitNumber);
    const currentPage = parseInt(page);

    res.status(200).json({
      data: contacts,
      total: totalContacts,
      totalPages,
      currentPage,
    });
  } catch (error) {
    next(error);
  }
};
