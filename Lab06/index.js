import express from "express"
import database from "./services/database.js"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import productRoute from "./route/productRoute.js"

dotenv.config()

const app = express()

const port = process.env.PORT

app.use(bodyParser.json())

app.use(productRoute)

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