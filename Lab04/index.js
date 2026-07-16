import express from "express"
import pkg from "pg"
const app = express()
const port = 3000

const {Pool} = pkg

const database = new Pool({
         connectionString:`postgres://dev:${encodeURIComponent('1234')}@localhost:5432/kushop`
})


app.get("/",(req,res)=>{
     console.log(`GET / is requested`)
    res.status(200).json({
        message:"ok"
    })
})


app.get("/products", async (req,res)=>{
    console.log(`GET / is requested`)

    try{
         const sqlsty = "SELECT * FROM products"
        const result = await database.query(sqlsty)
        return res.status(200).json(result.rows)
    } catch(err) {
           return res.status(500).json({
                message:err.message
           })
    }
   
})

app.get("/students", async (req,res)=>{
    console.log(`GET / is requested`)

    try{
         const sqlsty = "SELECT * FROM students"
        const result = await database.query(sqlsty)
        return res.status(200).json(result.rows)
    } catch(err) {
           return res.status(500).json({
                message:err.message
           })
    }
   
})
app.listen(port,()=>{
    console.log(`welcome to port ${port}`)
})
