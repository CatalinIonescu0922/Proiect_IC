import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import config_obj from './config/env.js'
import authRoutes from './modules/auth/auth.routes.js'
import createAccountRoutes from './modules/createAccount/createAccount.routes.js'
import profileRoutes from './modules/profile/profile.routes.js'
import gymRoutes from './modules/gyms/gyms.routes.js'
import logOut from './middleware/logOut.js'
import checkLogIn from "./middleware/verifyMe.js"
import sendRequest from './modules/sendRequest/sendRequest.routes.js'
import getAllUsers from './middleware/getUsersById.js'
import * as allInfoFromReq from './middleware/receiveAllRequests.js'
import updateRequestStatusHandler from './middleware/updateStatus.js'
const app=express();
const Router = express.Router()
// parse everything in to json 
app.use(express.json())
// expose the folder where the photos are saved 
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(cookieParser())
app.use(cors({
  origin: config_obj.front_end_url, // ✅ your frontend address here
  credentials: true, // ✅ if you're using cookies, sessions, or auth headers
}));
app.use(Router)

Router.use("/register-now", createAccountRoutes);
Router.use("/login" , authRoutes);
Router.use("/profile",profileRoutes);
Router.use("/gyms",gymRoutes);
Router.use("/logout",logOut)
Router.use("/check-log-in",checkLogIn);
Router.use("/send-request",sendRequest);
Router.use("/get-users",getAllUsers);
Router.use("/all-send-req/:senderId",allInfoFromReq.getSentRequestsByUser)
Router.use("/all-receive-req/:receiverId",allInfoFromReq.getReceivedRequestsByUser)
Router.use("/requests/update-status",updateRequestStatusHandler)
app.listen(config_obj.backend_port, ()=>{
    console.log(`app listen on port ${config_obj.backend_port}`)
})            