import db from '../config/dbconnect.js'; // Adjust the path to your DB connection

export async function getSentRequestsByUser(req, res) {
  const senderId = req.params.senderId;

  if (!senderId) {
    return res.status(400).json({ error: 'senderId parameter is required' });
  }

  try {
    const query = ` 
        SELECT sender_id, receiver_id, MIN(id) AS id, MIN(status) AS status
        FROM Requests
        WHERE sender_id = ?
        GROUP BY sender_id, receiver_id;
    `;
    const rows = await db.pool.query(query, [senderId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching sent requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getReceivedRequestsByUser(req, res) {
    const receiverId = req.params.receiverId;
  
    if (!receiverId) {
      return res.status(400).json({ error: 'receiverId parameter is required' });
    }
  
    try {
      const query = `
        SELECT sender_id, receiver_id, MIN(id) AS id, MIN(status) AS status
        FROM Requests
        WHERE receiver_id    = ?
        GROUP BY sender_id, receiver_id;
      `;
      const rows = await db.pool.query(query, [receiverId]);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching sent requests:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }