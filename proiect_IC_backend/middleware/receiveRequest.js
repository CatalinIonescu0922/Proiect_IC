import db from '../config/dbconnect.js'; // Adjust the path to your DB connection

export async function getSentRequestsByUser(req, res) {
  const senderId = req.params.senderId;

  if (!senderId) {
    return res.status(400).json({ error: 'senderId parameter is required' });
  }

  try {
    const query = `
      SELECT DISTINCT receiver_id FROM Requests
      WHERE sender_id = ?
    `;
    const rows = await db.pool.query(query, [senderId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching sent requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}