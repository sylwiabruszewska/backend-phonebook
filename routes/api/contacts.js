import express from "express";

import {
  getContacts,
  getContactById,
} from "../../controllers/contacts/index.js";

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export { router as contactsRouter };
