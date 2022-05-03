import express from "express";

import {
  getAllPartyHandler,
  getPartyByIdHandler,
  createPartyHandler,
} from "../controllers/party.controller";

import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createPartySchema } from "../schema/party.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);

// create party
router.post("/", validate(createPartySchema), createPartyHandler);
// Get all party
router.get("/", getAllPartyHandler);
// Get party by id
router.get("/:id", getPartyByIdHandler);

export default router;
