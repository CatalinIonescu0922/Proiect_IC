const logOutUser = (req,res)=>{
    res.clearCokie(('auth_token'),{
        httpOnly : true,
        secure: true,
        sameSite : 'Strict'
    });
    res.status(200).json({message : "User lohout succefull"});
}

export default logOutUser