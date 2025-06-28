import * as sendRequestModel from './sendRequest.model.js'
export async function sendBuddyRequest(sender_id, receiver_id) {
    if (sender_id === receiver_id) {
      throw new Error("You can't send a request to yourself.");
    }
  
    const existing = await sendRequestModel.findPendingRequest(sender_id, receiver_id);
    if (existing.length > 0) {
      throw new Error('Request already sent and pending.');
    }
  
    await sendRequestModel.addRequestToDB(sender_id, receiver_id);
    return { message: 'Request sent successfully' };
  }