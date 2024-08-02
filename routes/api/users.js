import express from "express";

import * as controllers from "#controllers/users/index.js";
import {
  authMiddleware,
  uploadMiddleware,
  bodyValidate,
} from "#middleware/index.js";
import {
  loginValidationSchema,
  registerValidationSchema,
  subscriptionSchema,
} from "#validators/index.js";

const router = express.Router();

router.post(
  "/signup",
  bodyValidate(registerValidationSchema),
  controllers.registerUser
);
router.post(
  "/login",
  bodyValidate(loginValidationSchema),
  controllers.loginUser
);
router.get("/logout", authMiddleware, controllers.logoutUser);
router.get("/current", authMiddleware, controllers.getCurrentUser);
router.patch(
  "/subscription",
  bodyValidate(subscriptionSchema),
  authMiddleware,
  controllers.updateUserSub
);
router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("picture"),
  controllers.updateAvatar
);
router.get("/verify/:verificationToken", controllers.verifyUser);
router.post("/verify", controllers.resendVerificationMail);

export { router as usersRouter };
