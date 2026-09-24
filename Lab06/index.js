import express from "express"
import cors from "cors"
import database from "./services/database.js"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import productRoute from "./route/productRoute.js"
import memberRoute from "./route/memberRoute.js"
import cookieParser from "cookie-parser"
import cartRoute from "./route/cartRoute.js"
dotenv.config()

const app = express()

const port = process.env.PORT

app.use(cors({
    origin:['http://localhost:5173','http://127.0.0.1:5173'], //Domain ของ Frontend
    methods:['GET','POST','PUT','DELETE'], //Method ที่อนุญาต
    credentials:true  //ให้ส่งข้อมูล Header+Cookie ได้
}))

app.use(bodyParser.json())
app.use(cookieParser())
app.use("/img_pd",express.static("img_pd"))

app.use(productRoute)
app.use(memberRoute)
app.use(cartRoute)

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