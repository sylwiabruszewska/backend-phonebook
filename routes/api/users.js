import express from "express";

import * as controllers from "#controllers/users/index.js";
import { authMiddleware } from "#middleware/index.js";

const router = express.Router();

router.post("/signup", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.get("/logout", authMiddleware, controllers.logoutUser);
router.get("/current", authMiddleware, controllers.getCurrentUser);
router.patch("/subscription", authMiddleware, controllers.updateUserSub);

export { router as usersRouter };
