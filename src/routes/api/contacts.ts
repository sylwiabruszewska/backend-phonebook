import express from "express";

import * as controllers from "@/controllers/contacts/index";

import { authMiddleware } from "@/middleware/authMiddleware";
import { bodyValidate } from "@/middleware/bodyValidate";
import { contactValidationSchema } from "@/validators/contactSchema";
import { editContactValidationSchema } from "@/validators/contactSchema";

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
