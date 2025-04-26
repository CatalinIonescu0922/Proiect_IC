import express from 'express'
import db from './config/dbconnect.js'
import config_obj from './config/env.js'
import createAccount from './login/createAccount.js'
import cors from 'cors'
import loginAcount from './login/auth.js'
import helmet from 'helmet'
const app=express();
const Router = express.Router()
// parse everything in to json 
app.use(express.json())


// relax the policy of sending data 
    // app.use(helmet.contentSecurityPolicy({
    //   directives: {
    //     defaultSrc: ["'self'"],           // Allow scripts and basic things from your server
    //     imgSrc: ["'self'", "data:", "blob:"],   // Allow images
    //     scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Allow scripts
    //     styleSrc: ["'self'", "'unsafe-inline'"], // Allow stylesheets
    //     connectSrc: ["'self'", "http://localhost:3000", "http://localhost:4200"], // Allow API calls
    //     fontSrc: ["'self'", "data:"],     // Allow fonts
    //     objectSrc: ["'none'"]             // No embedded objects like Flash (safe)
    //   }
    // }));


Router.use("/register-now", createAccount)
Router.use("/login" , loginAcount);

app.use(cors({
  origin: config_obj.front_end_url, // ✅ your frontend address here
  credentials: true, // ✅ if you're using cookies, sessions, or auth headers
}));
app.use(Router)
app.listen(config_obj.backend_port, ()=>{
    console.log(`app listen on port ${config_obj.backend_port}`)
})