import * as aboutService from "../services/aboutService.js";

export async function getAbout(req, res, next){
    try{
        const about = await aboutService.getAbout();
        res.status(200).json(about);
    }catch(err){
        next(err);
    }
}

export async function updateAbout(req, res, next){
    try{
        console.log('req.body:', req.body); // temporary
        const about = await aboutService.updateAbout(req.body);
        res.status(200).json(about);
    }catch(err){
        next(err);
    }
}