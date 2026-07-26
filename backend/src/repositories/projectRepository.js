import Project from "../models/Project.js";

export async function findAll() {
    return Project.find().populate("skills").sort({ createdAt: -1 });
}

export async function findById(id) {
    return Project.findById(id).populate("skills");
}

export async function create(data) {
    return Project.create(data);
}