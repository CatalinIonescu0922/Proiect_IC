import express from 'express'
import config_obj from './config/env.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './modules/auth/auth.routes.js'
import createAccountRoutes from './modules/createAccount/createAccount.routes.js'
import profileRoutes from './modules/profile/profile.routes.js'
import gymRoutes from './modules/gyms/gyms.routes.js'
import logOut from './middleware/logOut.js'
import checkLogIn from "./middleware/verifyMe.js"
const app=express();
const Router = express.Router()
// parse everything in to json 
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: config_obj.front_end_url, // ✅ your frontend address here
  credentials: true, // ✅ if you're using cookies, sessions, or auth headers
}));
app.use(Router)

Router.use("/register-now", createAccountRoutes)
Router.use("/login" , authRoutes);
Router.use("/profile",profileRoutes);
Router.use("/gyms",gymRoutes);
Router.use("/logout",logOut)
Router.use("/check-log-in",checkLogIn);
app.listen(config_obj.backend_port, ()=>{
    console.log(`app listen on port ${config_obj.backend_port}`)
})