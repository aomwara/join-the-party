import express from "express";

import { getAllPartyHandler } from "../controllers/party.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
// import { restrictTo } from "../middleware/restrictTo";
// import { validate } from "../middleware/validate";
// import { createUserSchema, loginUserSchema } from "../schema/user.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);
router.get("/", getAllPartyHandler);

export default router;
