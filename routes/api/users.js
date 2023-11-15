import express from "express";

import * as controllers from "#controllers/users/index.js";
import { authMiddleware, uploadMiddleware } from "#middleware/index.js";

const router = express.Router();

router.post("/signup", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.get("/logout", authMiddleware, controllers.logoutUser);
router.get("/current", authMiddleware, controllers.getCurrentUser);
router.patch("/subscription", authMiddleware, controllers.updateUserSub);
router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  controllers.updateAvatar
);

export { router as usersRouter };
