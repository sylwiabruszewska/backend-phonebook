import express from "express";

import * as controllers from "#controllers/contacts/index.js";
import { authMiddleware, bodyValidate } from "#middleware/index.js";
import { contactSchema } from "#validators/contactSchema.js";

const router = express.Router();

router.get("/", authMiddleware, controllers.getContacts);
router.get("/:contactId", authMiddleware, controllers.getContactById);
router.post(
  "/",
  authMiddleware,
  bodyValidate(contactSchema),
  controllers.postContact
);
router.delete("/:contactId", authMiddleware, controllers.deleteContact);
router.put(
  "/:contactId",
  bodyValidate(contactSchema),
  authMiddleware,
  controllers.putContact
);
router.patch(
  "/:contactId/favorite",
  authMiddleware,
  controllers.patchContactStatus
);

export { router as contactsRouter };
