import express from "express"

const router = express.Router();
const logOutUser = (req,res)=>{
    res.clearCookie(('authToken'),{
        httpOnly : true,
        secure: false,
        sameSite : 'Strict'
    });
    res.status(200).json({message : "User lohout succefull"});
}
router.post("/",logOutUser)
export default router