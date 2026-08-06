import express from "express"

import database from "./services/database.js"
import dotenv from 'dotenv'
import bodyParser, { json, text }  from "body-parser"
import { message } from "statuses"

dotenv.config()
const app  = express()

const port = process.env.PORT


/* import pkg from "pg"
const {Pool} = pkg */

/* const port = 3000 */


/* const database = new Pool({
         connectionString:`postgres://dev:${encodeURIComponent('1234')}@localhost:5432/kushop`
}) */

app.use(bodyParser.json())

app.post("/product",(req,res)=>{
    console.log(`POST products is requested`)
    
    const bodyData = req.body

    try{
        const sqlsty  = query.json({
                 text:`INSERT INTO products ("pdId","pdName","pdPrice","pdTypeId","brandId") VALUES ($1,$2,$3,$4,$5)`,
        values : [
            req.body = pdId,
             req.body.pdName,
                req.body.pdPrice,
                req.body.pdTypeId,
                req.body.brandId
        ]

       
        })
         const datetime = new Date()
         bodyData.createtime = datetime
         bodyData.message = "ok"
         res.status(201).json(bodyData)
       
    } catch(err){
              res.status(500).json({
            message:err.message
        })
    }
})

/* app.use(bodyParser.json())
app.post("/product",(req,res)=>{
     console.log(`GET it requested`)
     const bodyData = req.body
     try{
        const result = database.query({
            text:`INSERT INTO products ("pdId","pdName","pdPrice","pdTypeId","brandId")
            VALUES ($1,$2,$3,$4,$5)`,
            values:[
                req.body.pdId,
                req.body.pdName,
                req.body.pdPrice,
                req.body.pdTypeId,
                req.body.brandId
            ]
        })
         const datetime = new Date()
        bodyData.createDate = datetime
        bodyData.message-"ok"
        res.status(201).json(bodyData)
     } catch(err){
        res.status(500).json({
            message:err.message
        })
     }
    

     res.status(201).json(bodyData)
})
 */



app.get("/",(req,res)=>{
    console.log(`GET it requested`)

    res.status(200).json({
        message:"ok"
    })
})


app.get("/product", async(req,res)=>{
     console.log(`GET it requested`)
     
     try{
        const sqlsty = "SELECT * FROM products"
        const result = await database.query(sqlsty)
        return res.status(200).json(result.rows)
     }catch(err){
        return res.status(500).json({
            message:err.message
        })
        
    }
})

app.post("/products",(req,res)=>{

    console.log(`POST products is requested`)
    const bodyData = req.body

    try{
        if(!body.pdId || !body.pdName) {
            res.status(422).json({
                message:`error in pdid or pdname`
            })
        }

       const chkrow = database.query({
            text:`SELECT * FROM  products WHERE "pdid" = $1`,
            values:[bodyData.pdId]
       })

       if(chkrow.rowCount != 0) {
            return res.status(422).json({
                 message:`ERROR pdid ${bodyData.pdId} ids exits`
            })
       }


    } catch(err){
        message:err.message
    }
})

/* app.post("/products",async(req,res)=>{
    console.log(`GET it requested`)
    const bodyData = req.body
    try{
        if(!bodyData.pdId || !bodyData.pdName){
            return res.status(422).json({
                message:`ERROR pdid or pdname is requred`
            })
        }

        const chkrow = await database.query({
            text:`SELECT * FROM  products WHERE "pdid" = $1`,
            values:[bodyData.pdId]
        })
        if(chkrow.rowCount != 0) {
            return res.status(422).json({
                message:`ERROR pdid ${bodyData.pdId} ids exits`
            })
        }
    } catch(err){
        message:err.message
    }
}) */


app.get("/students", async(req,res)=>{
     console.log(`GET it requested`)
     
     try{
        const sqlsty = "SELECT * FROM students"
        const result = await database.query(sqlsty)
        return res.status(200).json(result.rows)
     }catch(err){
        return res.status(500).json({
            message:err.message
        })
        
    }
})




app.listen(port,()=>{
    console.log(`listen to port ${port}`)
})