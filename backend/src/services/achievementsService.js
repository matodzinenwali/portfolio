import * as achievementsRepository from "../repositories/achievementsRepository.js";

export async function getAllAchievements(){
    return achievementsRepository.findAll();
}

export async function getAllAchievementsById(id){
    const achievement = await achievementsRepository.findById(id);
    if(!achievement){
        const error = new Error("Achievement not found");
        error.statusCode = 404;
        throw error;
    }
    return achievement;
}

export async function createAchievements(data){
    if(!data.title || !data.issuer){
        const error = new Error("Title and issuer are required");
        error.statusCode = 400;
        throw error;
    }
    return achievementsRepository.create(data);
}