import db from "../../config/dbconnect.js";

export async function addRequestToDB(sender_id,receiver_id){
    const defaultStatus = "pending";
    await db.pool.query(
      `INSERT INTO Requests (sender_id, receiver_id, status) VALUES (?, ?, ?)`,
      [sender_id, receiver_id, defaultStatus]
    );
}

export async function findPendingRequest(sender_id, receiver_id) {
    const query = `
      SELECT * FROM Requests
      WHERE sender_id = ? AND receiver_id = ? AND status = 'pending'
    `;
    const [rows] = await db.pool.query(query, [sender_id, receiver_id]);
    return rows || [];
  }