import { Router } from "express";
import { getAchievements, getAchievement, createAchievement } from "../controllers/achievementsController.js";
import { requireAuth } from "../middleware/authMiddleware.js"

const router = Router();

router.get("/", getAchievements);
router.get("/:id", getAchievement);

//authorization is required to access this routes
router.post("/", requireAuth, createAchievement);

export default router;