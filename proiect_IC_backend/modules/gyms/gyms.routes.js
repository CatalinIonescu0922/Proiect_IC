import { getGymsController } from './gyms.controler.js';
import express from 'express'
import gymMembers from "../gymMembers/gymMembers.routes.js"

const router = express.Router()


router.get("/",getGymsController);

// handles the sub-route gyms/:gymID 

router.use("/:gymID", gymMembers)


/**
 * @route get all the gyms
 * @desc get detail to all of the gyms 
 * @acces public route
 */
export default router