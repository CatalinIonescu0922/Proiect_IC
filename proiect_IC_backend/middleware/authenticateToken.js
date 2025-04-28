import jwt from 'jsonwebtoken'
import config_obj from '../config/env.js'

export function authenticateToken(req , res , next){
    const token = req.cookies.authToken;
    if(!token){
        return res.status(401).json({message : 'Acces denied . No token provided'})
    }
    try{
        const decoded = jwt.verify(token, config_obj.secret_key);
        req.user = decoded;
        next();
    } catch (err){
        console.error('JWT verification failed ', err.message);
        return res.status(401).json({message : 'Invalid or expired token'});
    }
}