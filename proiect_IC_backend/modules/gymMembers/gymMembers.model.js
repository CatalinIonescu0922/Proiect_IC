import db from "../../config/dbconnect.js";

export async function getGymMembers(gymID){
    const data = await db.pool.query(` Select id, first_name , last_name ,profile_photo from Users where id IN
    (Select user_id from Gym_users where gym_id = ?)`,[gymID])
    return data;
}