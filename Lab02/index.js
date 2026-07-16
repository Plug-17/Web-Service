import express, { json } from "express"
const app = express()
const port = 3000

const students = [{"id":"220","name":"plug"}]
app.get('/',(req,res)=>{
    console.log('GET Request!!')
    console.log(req.rawHeaders[1])

    res.send(`
        <h1> LAB02 </h1>
        <p> ได้รับการร้องขอจาก IP ${req.ip}</p>
        `);
})

app.get("/students",(req,res)=>{
    res.json(students)
})


app.get('/ip',(req,res)=>{
    console.log('GET Request!!')
    console.log(req.rawHeaders[1])

    res.send(`
        <h1> LAB02 </h1>
        <p> Request from IP:${req.ip}</p>
        `);
})





app.get('/readparam',(req,res)=>{
    console.log(JSON.stringify(req.query));
    const name = req.query.name || 'ไม่ได้ระบุชื่อ';
    const id = req.query.id || 'ไม่ได้ระบุรหัส';

    res.send(`
        <h1> Hello ${name} :id ${id} </h1>
        <h3> from ชินวัตร 6730200464 </h3>
        `);
})


app.listen(port,()=>{
    console.log(`Sever running on port ${port}`)
})