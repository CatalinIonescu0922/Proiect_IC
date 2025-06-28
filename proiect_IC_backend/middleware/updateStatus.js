import db from '../config/dbconnect.js'; // your DB connection

/**
 * Express handler to update the status of a buddy request.
 */
async function updateRequestStatusHandler(req, res) {
  const { sender_id, receiver_id, status } = req.body;

  const allowedStatuses = ['accepted', 'rejected'];
  if (!sender_id || !receiver_id || !allowedStatuses.includes(status)) {
    return res.status(400).send({ error: 'Invalid parameters' });
  }

  try {
    const query = `
      UPDATE Requests
      SET status = ?
      WHERE sender_id = ? AND receiver_id = ? AND status = 'pending'
    `;
    const result = await db.pool.query(query, [status, sender_id, receiver_id]);

    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'No matching pending request found' });
    }

    return res.status(200).send({ message: `Request ${status}` });
  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).send({ error: 'Internal server error' });
  }
}

export default updateRequestStatusHandler;
