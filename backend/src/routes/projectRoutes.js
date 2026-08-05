import { Router } from "express";
import { getProjects, getProject, createProject } from "../controllers/projectController.js";
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProject);

//authorization is required to access this routes
router.post('/', requireAuth, createProject);

export default router;