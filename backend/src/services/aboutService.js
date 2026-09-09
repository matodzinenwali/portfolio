import * as aboutRepository from "../repositories/aboutRepository.js";

export async function getAbout(){
    const about = await aboutRepository.find();
    if(!about){
        const error = new Error("About info not set yet");
        error.statusCode = 404;
        throw error;
    }
    return about;
}

export async function updateAbout(data){
    if(!data.bio){
        const error = new Error("bio is required");
        error.statusCode = 400;
        throw error;
    }
    return aboutRepository.upsert(data);
}
