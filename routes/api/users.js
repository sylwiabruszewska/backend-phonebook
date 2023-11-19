import express from "express";

import * as controllers from "#controllers/users/index.js";
import { authMiddleware } from "#middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.get("/logout", authMiddleware, controllers.logoutUser);
router.get("/current", authMiddleware, controllers.currentUser);
router.patch("/subscription", authMiddleware, controllers.updateUserSub);

export { router as usersRouter };
