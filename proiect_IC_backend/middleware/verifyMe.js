import express from 'express'
import { authenticateToken } from './authenticateToken.js';
const router = express.Router();

router.get("/",authenticateToken,(req,res)=>{
    res.status(200).json({message : "Authentification completed"})
})

export default router
