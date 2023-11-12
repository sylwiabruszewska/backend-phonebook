import express from "express";

import {
  getContacts,
  getContactById,
  postContact,
  putContact,
  deleteContact,
  patchContactStatus,
} from "#controllers/contacts/index.js";
import { authMiddleware } from "#middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getContacts);
router.get("/:contactId", authMiddleware, getContactById);
router.post("/", authMiddleware, postContact);
router.delete("/:contactId", authMiddleware, deleteContact);
router.put("/:contactId", authMiddleware, putContact);
router.patch("/:contactId/favorite", authMiddleware, patchContactStatus);

export { router as contactsRouter };
