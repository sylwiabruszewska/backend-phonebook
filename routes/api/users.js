import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUserSub,
} from "#controllers/users/index.js";
import { authMiddleware } from "#middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/logout", authMiddleware, logoutUser);
router.get("/current", authMiddleware, currentUser);
router.patch("/subscription", authMiddleware, updateUserSub);

export { router as usersRouter };
