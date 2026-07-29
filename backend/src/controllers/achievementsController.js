import * as achievementsService from "../services/achievementsService.js";

export async function getAchievements(req, res, next){
    try{
        const achievements = await achievementsService.getAllAchievements();
        res.status(200).json(achievements);
    }catch(err){
        next(err);
    }
}

export async function getAchievement(req, res, next){
    try{
        const achievement = await achievementsService.getAllAchievementsById(req.params.id);
        res.status(200).json(achievement);
    }catch(err){
        next(err);
    }
}

export async function createAchievement(req, res, next){
    try{
        const achievement = await achievementsService.createAchievements(req.body);
        res.status(201).json(achievement);
    }catch(err){
        next(err);
    }
}