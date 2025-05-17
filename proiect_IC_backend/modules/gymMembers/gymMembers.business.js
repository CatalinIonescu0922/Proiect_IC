import { getGymMembers } from "./gymMembers.model.js";


export async function GymMembers(gymID) {
    const membersRows = await getGymMembers(gymID)

    if(!getGymMembers){
        throw new Error("members can not be empty")
    }

    return membersRows
}