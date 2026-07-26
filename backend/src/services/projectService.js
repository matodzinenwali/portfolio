import * as projectRepository from "../repositories/projectRepository.js";

export async function getAllProjects() {
    return projectRepository.findAll();
}

export async function getProjectById(id) {
    const project = await projectRepository.findById(id);
    if (!project) {
        const error = new Error("Project not found");
        error.statusCode = 404;
        throw error;
    }
    return project;
}

export async function createProject(data){
    if(!data.title || data.description){
        const error = new Error("Title and description are required");
        error.statusCode = 400;
        throw error;
    }
    return projectRepository.create(data);
}