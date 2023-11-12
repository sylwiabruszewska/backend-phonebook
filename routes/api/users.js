import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
} from "#controllers/users/index.js";
import { authMiddleware } from "#middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/logout", authMiddleware, logoutUser);
router.get("/current", authMiddleware, currentUser);

export { router as usersRouter };
