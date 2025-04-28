import express from 'express'
import { authenticateToken } from '../../middleware/authenticateToken.js';
import { getProfileDetails } from './profile.controler.js';
const router = express.Router();

/**
 * @route GET /profile
 * @desc get the ditails of the user 
 * @access Private route
 */
router.get('/',authenticateToken, getProfileDetails);

export default router