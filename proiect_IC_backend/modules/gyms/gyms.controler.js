import { gymDetails } from "./gyms.business.js";

export async function getGymsController(req , res ,next) {
    try{
        const gyms = await gymDetails();
        res.status(200).json(gyms);
    } catch(err){
        console.error('Gyms can not be taken',err);
        res.status(500).json({message : "Failed to load gyms"});
    }
}