import dotenv from 'dotenv'
dotenv.config();
// env obj ia toate valorile din .env file 
// trebuie importat in fiecare fisier pentru a putea fi folosit
const config_obj = {
    port :process.env.MYSQL_PORT,
    db_name : process.env.MYSQL_DATABASE,
    db_user : process.env.MYSQL_USER,
    db_password : process.env.MYSQL_PASSWORD,
    front_end_url : process.env.FRONT_END_URL,
    db_host : process.env.MYSQL_HOST,
    backend_port : process.env.BACKEND_PORT
}
export default config_obj;