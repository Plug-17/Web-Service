import express from "express"
import bodyParser from "body-parser"
const app = express()
const port = 3000


app.use(bodyParser.json())
const students = [{"id":"6730200464","name":"ชินวัตร กลิ่นนาค"}]
app.get("/student",(req,res)=>{
    console.log(`get students is requested`)
    res.json(students)
})

app.post('/students',(req,res)=>{
   const bodydata = req.body
   console.log(bodydata)

   bodydata.devid = "1556"
   res.status(201).json(bodydata)
})




app.listen(port,()=>{
    console.log(`welcome to port ${port}`)
})