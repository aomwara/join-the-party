import express from "express";

import { joinHandler, getMeJoinHandler } from "../controllers/join.controller";

import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { joinSchema } from "../schema/join.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);

// create party
router.post("/", validate(joinSchema), joinHandler);

// get me join
router.get("/me", getMeJoinHandler);

export default router;
