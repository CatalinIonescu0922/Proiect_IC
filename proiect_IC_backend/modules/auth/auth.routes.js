import express from 'express';
import { loginController } from './auth.controller.js';

const router = express.Router();

/**
 * @route   POST /auth
 * @desc    Log in a user
 * @access  Public
 */
router.post('/', loginController);

export default router;
