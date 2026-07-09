import express from "express"
const app = express()
const port = 3000


app.get("/students",(req,res)=>{
    res.send(``)
})

app.get("/",(req,res)=>{
    console.log("not found 404")
})

app.listen(port,()=>{
    console.log(`hello to port ${port}`)
})

