import { GymMembers } from "./gymMembers.business.js"


export async function gymMembersControler(req , res , next){
    try{
        const gymID = req.params.gymID;
        const members = await GymMembers(gymID);
        res.status(200).json(members); 
    } catch(err){
        console.error("members can't be retrived ", err);
        res.status(500).json({message : "Failed to load members "});
    }
} 
