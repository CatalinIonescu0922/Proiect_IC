import db from "../../config/dbconnect.js";

export async function getGyms(){
   const gyms = await db.pool.query(`
    SELECT name , location  from Gyms 
    `)
    return gyms;
}