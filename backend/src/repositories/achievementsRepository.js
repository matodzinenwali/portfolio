import Achievements from "../models/Achievements.js";

export async function findAll(){
    return Achievements.find().sort({createdAt: -1});
}

export async function findById(id){
    return Achievements.findById(id);
}

export async function create(data){
    return Achievements.create(data);
}