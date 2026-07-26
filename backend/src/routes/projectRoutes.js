import { Router } from "express";
import { getProjects, getProject, createProject } from "../controllers/projectController";

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', createProject);

export default router;