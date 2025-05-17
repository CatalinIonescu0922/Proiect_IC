import db from "../../config/dbconnect.js";

export async function getGyms(){
   const gyms = await db.pool.query(`
    SELECT * from Gyms 
    `)
    return gyms;
}