import { getGyms } from "./gyms.model.js";

export async function gymDetails(){
    const gymsRows = await getGyms();
    if(!gymsRows){
        throw new Error("gyms can not be get");
    }
    return gymsRows;
}