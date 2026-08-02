import Router from "express";
import { getAbout, updateAbout } from "../controllers/aboutController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAbout);
router.put("/", requireAuth, updateAbout);

export default router;

