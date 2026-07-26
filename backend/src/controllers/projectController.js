import * as projectService from "../services/projectService.js";

export async function getProjects(req, res, next) {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json(projects);
    } catch (err) {
        next(err);
    }
}

export async function getProject(req, res, next) {
    try {
        const project = await projectService.getProjectById(req.params.id);
        res.status(200).json(project);
    } catch (err) {
        next(err);
    }
}

export async function createProject(res, res, next) {
    try {
        const project = await projectService.createProject(req.body);
        res.status(201).json(project);
    } catch (err) {
        next(err);
    }
}