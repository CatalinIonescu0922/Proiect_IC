import express from 'express'
const Router = express.Router();
import createAccount from '../login/createAccount'
import loginAcount from '../login/auth'
Router.use("/register-now", createAccount)
Router.use("/login" , loginAcount);
export default Router;