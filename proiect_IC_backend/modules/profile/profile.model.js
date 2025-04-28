import db from "../../config/dbconnect.js";

export async function getUserProfileById(userId){
    const users = await db.pool.query(
        `SELECT email, first_name, last_name, birth_day,
            PR_arm, PR_bench_press, PR_leg_press, description, gender
     FROM Users
     WHERE id = ?`,
     [userId]
    );

    return users[0];
}