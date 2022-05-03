import express from "express";
import {
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerHandler,
  authCheckHandler,
  getProfileHandler,
} from "../controllers/auth.controller";
import {
  getAllUsersHandler,
  getMeHandler,
} from "../controllers/user.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { restrictTo } from "../middleware/restrictTo";
import { validate } from "../middleware/validate";
import { createUserSchema, loginUserSchema } from "../schema/user.schema";

const router = express.Router();

// Register user route
router.post("/register", validate(createUserSchema), registerHandler);

// Login user route
router.post("/login", validate(loginUserSchema), loginHandler);

// Refresh access toke route
router.get("/refresh", refreshAccessTokenHandler);

router.use(deserializeUser, requireUser);

// Auth Check
router.get("/check", authCheckHandler);

// Get profile
router.get("/profile", getProfileHandler);

// Logout User
router.get("/logout", logoutHandler);

// Admin Get Users route
router.get("/", restrictTo("admin"), getAllUsersHandler);

// Get my info route
router.get("/me", getMeHandler);

export default router;
