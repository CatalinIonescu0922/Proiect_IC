import express from 'express'
import db from './config/dbconnect.js'
import config_obj from './config/env.js'
const app=express();

app.get('/', (req,res)=>{
   res.send("hello world");
})

app.listen(config_obj.backend_port, ()=>{
    console.log(`app listen on port ${config_obj.backend_port}`)
})