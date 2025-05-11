import { getGymsController } from './gyms.controler.js';
import express from 'express'
const router = express.Router()


router.get("/",getGymsController);
/**
 * @route get all the gyms
 * @desc get detail to all of the gyms 
 * @acces public route
 */
export default router