import express from "express";

import {
  getContacts,
  getContactById,
  postContact,
  putContact,
  deleteContact,
  patchContactStatus,
} from "#controllers/contacts/index.js";

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContactById);
router.post("/", postContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", putContact);
router.patch("/:contactId/favorite", patchContactStatus);

export { router as contactsRouter };
