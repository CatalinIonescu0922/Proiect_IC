import express from 'express'
import db from './config/dbconnect.js'
import config_obj from './config/env.js'
const app=express();
// const config = require('./config/env');


console.log(config_obj.port)
console.log(config_obj.front_end_url)

const result = await db.pool.query(`Select * from Roles`);

console.log(result)