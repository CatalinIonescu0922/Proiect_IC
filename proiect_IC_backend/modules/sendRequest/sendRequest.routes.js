import express from 'express';
import { sendRequestController } from './sendRequest.controler.js';
import { getSentRequestsByUser } from '../../middleware/receiveRequest.js';
const router = express.Router();

router.post('/', sendRequestController);
router.get('/:senderId',getSentRequestsByUser);

export default router;
