import Skill from "../models/Skill.js";

export async function findAll(){
    return Skill.find().sort({createdAt: -1});
}

export async function findById(id){
    return Skill.findById(id);
}

export async function create(data){
    return Skill.create(data);
}