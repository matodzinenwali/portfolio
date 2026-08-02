import About from "../models/About.js";

export async function find(){
    return About.findOne();
}

export async function upsert(data){
    return About.findOneAndUpdate({}, data, {
        upsert: true, //create if none exists
        returnDocument: 'after',
        runValidators: true, //still enforce schema validation
    });
}