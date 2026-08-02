import Router from "express";
import { getSkill, getSkills, createSkill } from "../controllers/skillController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:id", getSkill);
router.get("/", getSkills);
router.put("/", requireAuth, createSkill);

export default router;