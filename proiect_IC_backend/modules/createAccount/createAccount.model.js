import db from '../../config/dbconnect.js';

export async function findUserByEmail(email) {
  const users = await db.pool.query(
    'SELECT * FROM `Users` WHERE `email` = ?',
    [email]
  );

  return users[0] || null;
}

export async function createUser(userData) {
  const result = await db.pool.query(
    `INSERT INTO Users
     (email, password_hash, first_name, last_name, birth_day, PR_arm, PR_bench_press, PR_leg_press, description, gender)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userData.email,
      userData.password_hash,
      userData.first_name,
      userData.last_name,
      userData.birth_day,
      userData.PR_arm,
      userData.PR_bench_press,
      userData.PR_leg_press,
      userData.description,
      userData.gender
    ]
  );
  
  return result.insertId;
}

export async function assignDefaultRole(userId) {
  const defaultRoleId = 2; // Normal user role

  await db.pool.query(
    `INSERT INTO User_Roles (user_id, role_id) VALUES (?, ?)`,
    [userId, defaultRoleId]
  );
}
