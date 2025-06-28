import db from '../config/dbconnect.js'; // Your DB connection

/**
 * Fetch user details for given user IDs.
 * Accepts array of userIds via req.body.userIds
 */
export default async function fetchUsersByIds(req, res) {
  const userIds = req.query.userIds.split(',').map(id => parseInt(id, 10));
  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ error: 'userIds array is required' });
  }

  try {
    // Use parameterized query with placeholders for IN clause
    const placeholders = userIds.map(() => '?').join(',');
    const query = `
      SELECT id, first_name, last_name, profile_photo
      FROM Users
      WHERE id IN (${placeholders})
    `;
    const users = await db.pool.query(query, userIds);  
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
