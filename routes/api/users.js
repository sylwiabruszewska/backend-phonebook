import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
} from "#controllers/users/index.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/current", currentUser);

export { router as usersRouter };
