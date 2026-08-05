import Router from "express";
import { getAbout, updateAbout } from "../controllers/aboutController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAbout);

//authorization is required to access this routes
router.put("/", requireAuth, updateAbout);

export default router;

