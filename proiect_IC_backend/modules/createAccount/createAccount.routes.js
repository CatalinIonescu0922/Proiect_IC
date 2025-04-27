import express from 'express';
import { createAccountController } from './createAccount.controler.js';

const router = express.Router();

/**
 * @route   POST /auth
 * @desc    Log in a user
 * @access  Public
 */
router.post('/', createAccountController);

export default router;