import express from "express";

import * as controllers from "@/controllers/users/index";

import { authMiddleware } from "@/middleware/authMiddleware";
import { bodyValidate } from "@/middleware/bodyValidate";
import { loginValidationSchema } from "@/validators/userSchema";
import { registerValidationSchema } from "@/validators/userSchema";

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
router.post("/logout", authMiddleware, controllers.logoutUser);
router.get("/current", authMiddleware, controllers.getCurrentUser);
router.get("/verify/:verificationToken", controllers.verifyUser);

export { router as usersRouter };
