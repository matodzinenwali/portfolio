import Router from "express";
import { getSkill, getSkills, createSkill } from "../controllers/skillController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:id", getSkill);
router.get("/", getSkills);

//authorization is required to access this routes
router.post("/", requireAuth, createSkill);

export default router;
