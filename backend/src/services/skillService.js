import * as skillRepository from "../repositories/skillRepository.js";

export async function getAllSkills() {
    return skillRepository.findAll();
}

export async function getSkillById(id) {
    const skill = await skillRepository.findById(id);
    if (!skill) {
        const error = new Error("Skill not found");
        error.statusCode = 404;
        throw error;
    }
    return skill;
}

export async function createSkill(data) {
    if (!data.name) {
        const error = new Error("skill name is required");
        error.statusCode = 400;
        throw error;
    }
    return skillRepository.create(data);
}
