import express from 'express'
import {gymMembersControler} from './gymMembers.controler.js'
const router = express.Router({mergeParams : true});


router.get("/", gymMembersControler)

export default router;