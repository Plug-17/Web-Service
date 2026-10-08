import express from "express"
import cors from "cors"
import database from "./services/database.js"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import productRoute from "./route/productRoute.js"
import memberRoute from "./route/memberRoute.js"
import cookieParser from "cookie-parser"
import cartRoute from "./route/cartRoute.js"
import swaggerUI from "swagger-ui-express"
import yaml from "yaml"
// ใช้ File
import fs from "fs"

dotenv.config()

const app = express()

const port = process.env.PORT

app.use(cors({
    origin:['http://localhost', 'http://127.0.0.1',
            'http://localhost:5173','http://127.0.0.1:5173',
            'http://localhost:4173','http://127.0.0.1:4173',
            ],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))


app.use(bodyParser.json())
app.use(cookieParser())
app.use("/img_pd",express.static("img_pd"))
app.use("/img_mem",express.static("img_mem"))

app.use(productRoute)
app.use(memberRoute)
app.use(cartRoute)


// swagger กำหนด file config ของตัว swagger
const swaggerfile = fs.readFileSync('services/swagger.yaml','utf-8')
const swaggerDoc = yaml.parse(swaggerfile)

// กำหนด path ที่จะให้เรียกหน้า Document ขึ้นมา
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))


app.get("/", (req, res) => {
    console.log("GET it requested")

    res.status(200).json({
        message: "ok"
    })
})

app.get("/students", async (req, res) => {
    console.log("GET students requested")

    try {
        const sqlsty = "SELECT * FROM students"
        const result = await database.query(sqlsty)

        return res.status(200).json(result.rows)

    } catch (err) {

        return res.status(500).json({
            message: err.message
        })
    }
})

app.listen(port, () => {
    console.log(`listen to port ${port}`)
})