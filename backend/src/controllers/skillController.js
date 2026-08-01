import * as skillService from "../services/skillService.js";

export async function getSkills(req, res, next){
    try{
        const skills = await skillService.getAllSkills();
        res.status(200).json(skills);
    }catch(err){
        next(err);
    }
}

export async function getSkill(req, res, next){
    try{
        const skill = await skillService.getSkillById(req.params.id);
        res.status(200).json(skill);
    }catch(err){
        next(err);
    }
}

export async function createSkill(req, res, next){
    try{
        const skill = await skillService.createSkill(req.body);
        res.status(201).json(skill);
    }catch(err){
        next(err);
    }
}