import pkg from "pg"
const {Pool} = pkg
import dotenv from 'dotenv'
import bodyParser  from "body-parser"
dotenv.config()
const DBSEVER = process.env.DBSEVER
const DBUSER = process.env.DBUSER
const DBPWD = process.env.DBPWD
const DBHOST = process.env.DBHOST
const DBPORT = process.env.DBPORT
const DB = process.env.DB
const PORT  = 3000
export default new   Pool({
         connectionString:`${DBSEVER}://${DBUSER}:${encodeURIComponent(DBPWD)}@${DBHOST}:${DBPORT}/${DB}`
})