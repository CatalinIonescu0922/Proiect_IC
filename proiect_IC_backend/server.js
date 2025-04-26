import express from 'express'
import db from './config/dbconnect.js'
import config_obj from './config/env.js'
import createAccount from './login/createAccount.js'
import cors from 'cors'
import loginAcount from './login/auth.js'
const app=express();
const Router = express.Router()



Router.use("/register-now", createAccount)
Router.use("/login" , loginAcount);

app.use(cors({
  origin: config_obj.front_end_url, // ✅ your frontend address here
  credentials: true, // ✅ if you're using cookies, sessions, or auth headers
}));

app.listen(config_obj.backend_port, ()=>{
    console.log(`app listen on port ${config_obj.backend_port}`)
})