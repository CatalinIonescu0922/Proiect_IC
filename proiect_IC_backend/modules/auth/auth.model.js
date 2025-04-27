import db from '../../config/dbconnect.js';

export async function findUserByEmail(email) {
  const users = await db.pool.query(
    'SELECT * FROM `Users` WHERE `email` = ?',
    [email]
  );
  return users[0];
}

export async function findUserRoles(userId) {
  const roles = await db.pool.query(
    `SELECT r.*
       FROM Roles r
       JOIN User_Roles ur ON ur.role_id = r.id
      WHERE ur.user_id = ?`,
    [userId]
  );
  return roles; // Returns an array of roles
}
