import express from "express";

import * as controllers from "#controllers/contacts/index.js";
import { authMiddleware, bodyValidate } from "#middleware/index.js";
import {
  contactValidationSchema,
  editContactValidationSchema,
} from "#validators/contactSchema.js";

const router = express.Router();

router.get("/", authMiddleware, controllers.getContacts);
router.get("/:contactId", authMiddleware, controllers.getContactById);
router.post(
  "/",
  authMiddleware,
  bodyValidate(contactValidationSchema),
  controllers.postContact
);
router.delete("/:contactId", authMiddleware, controllers.deleteContact);
router.patch(
  "/:contactId",
  bodyValidate(editContactValidationSchema),
  authMiddleware,
  controllers.patchContact
);
router.patch(
  "/:contactId/favorite",
  authMiddleware,
  controllers.patchContactStatus
);

export { router as contactsRouter };
