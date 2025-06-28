import * as sendRequestBusiness from './sendRequest.business.js';

export async function sendRequestController(req, res) {
  try {
    const { sender_id, receiver_id } = req.body;

    if (!sender_id || !receiver_id) {
      return res.status(400).json({ error: 'sender_id and receiver_id are required.' });
    }

    const result = await sendRequestBusiness.sendBuddyRequest(sender_id, receiver_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
