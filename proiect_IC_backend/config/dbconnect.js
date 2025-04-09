import mariadb from 'mariadb'
import config_obj  from './env.js'
const db= Object.freeze({
    pool: mariadb.createPool({
        host: config_obj.db_host,
        port : config_obj.port,
        user : config_obj.db_user,
        password : config_obj.db_password,
        database : config_obj.db_name
    })
})

export default db;