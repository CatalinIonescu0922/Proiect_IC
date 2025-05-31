import db from "../../config/dbconnect.js";

export async function getUserProfileById(userId){
    const users = await db.pool.query(
        `SELECT *
     FROM Users
     WHERE id = ?`,
     [userId]
    );

    return users[0];
}