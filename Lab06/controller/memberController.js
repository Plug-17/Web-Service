import database from '../services/database.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import multer from "multer"


// upload part
// 1. การกำหนดค่า storage (พื้นที่จัดเก็บไฟล์)
const storage = multer.diskStorage({
    // destination: กำหนดโฟลเดอร์ปลายทางที่จะเก็บไฟล์
    destination: function (req, file, cb) {
        // cb = callback function
        // cb(null, 'img_mem') หมายถึง: ไม่มี error (null) และให้เก็บไฟล์ในโฟลเดอร์ 'img_mem'
        cb(null, 'img_mem')
    },
   
    // filename: กำหนดชื่อไฟล์ที่จะบันทึก
    filename: function (req, file, cb) {
        // req.body.memEmail คือการดึงค่า email จาก form data ที่ส่งมา
        // ตัวอย่าง: ถ้า memEmail = "test@gmail.com" ไฟล์จะถูกบันทึกเป็น "test@gmail.com.jpg"
        const filename = `${req.body.memEmail}.jpg`
        // กำหนดชื่อไฟล์ผ่าน callback
        cb(null, filename)
    }
})


// 2. การกำหนดค่า uploader
const upload = multer({
    storage: storage,  // ใช้ storage configuration ที่กำหนดไว้
}).single('file');    
// single('file') หมายถึงรับอัปโหลดไฟล์เดียว และ field name ใน form ต้องชื่อ 'file'

//3.Method ที่ให้ Frontend เรียกใช้
export async function uploadMember(req, res) {
   console.log("Upload Member Image")
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json({ message: 'File uploaded successfully!' });
    });
}


export async function logoutMember(req,res) {
    console.log("GET /logoutmember is requested")

    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:true,
            sameSite:'strict'
        })

        res.json({message:"login fail",login:false})


    } catch(err) {
        return res.json({
            message:err.message
        })
    }
}


export async function getMember(req,res) {
    console.log('GET/getMember')

    const token = req.cookies.token

    if(!token) {
        return res.json({message:'No member',login:false})
    }

    try{
    const secret = process.env.SECRET_KEY
        const member = jwt.verify(token,secret)
        console.log(member)
        return res.json({
            memEmail:member.memEmail,
            memName:member.memName,
            dutyId:member.dutyId,
            login:true
        })
    } catch(err){
        console.log(err.message)
        return res.json({message:'The information in false',login:false})
    }
}
export async function postMember(req,res) {
    console.log(`POST /members is requested`)
    const bodyData = req.body 

    try{

        if(!bodyData.memEmail || !bodyData.memName){
            return res.status(422).json({message:`ERROR memEmail and memName is requried`,regist:false})
        }

        const chkRow = await database.query({
            text:`SELECT * FROM members WHERE "memEmail" = $1`,
            values:[bodyData.memEmail]
        })

        if(chkRow.rowCount != 0){
          return  res.status(409).json({message:`ERROR memEmail ${bodyData.memEmail} is exists`,regist:false})
        }
        const pwd = req.body.password
        const saltround  = 11
        const pwdHash  = await bcrypt.hash(pwd,saltround)
         const sqlsty  = await database.query({
                 text:`INSERT INTO "members" ("memEmail","memName","memHash") VALUES ($1,$2,$3)`,
        values : [
            req.body.memEmail,
            req.body.memName,
            //req.body.memHash,
            pwdHash
        ]

       
        })
         //const datetime = new Date()
         bodyData.createDate= new Date()
         bodyData.message = "Regist Success"
         bodyData.regist = true
         res.json(bodyData)

     }catch(err){
        return res.json({
            message:err.message,regist:false
        })  
     }
}

export async function loginMember(req,res) {
    console.log(`POST /members is requested`)
    const bodyData = req.body 

    try{

        if(!bodyData.loginName || !bodyData.password){
            return res.json({message:`ERROR loginName and Password is requried`,login:false})
        }

        const result = await database.query({
            text:`SELECT * FROM members WHERE "memEmail" = $1`,
            values:[bodyData.loginName]
        })

        if(result.rowCount == 0){
         return  res.json({message:`Login Fail`,login:false})
        }
      
       const loginOk = await  bcrypt.compare(bodyData.password,result.rows[0].memHash)

       
        
         if (loginOk) {
            const theuser = {
                memEmail:result.rows[0].memEmail,
                memName:result.rows[0].memName,
                dutyId:result.rows[0].dutyId
            }
            const secret = process.env.SECRET_KEY
            const token = jwt.sign(theuser,secret,{expiresIn:'1h'})

            res.cookie('token',token,{
                maxAge:3600000, //3,600,000 ms --> 60 minute -->1hr,
                httpOnly: true, // ป้องกันการเข้าถึง Token ผ่าน JavaScript (ป้องกัน XSS)
                secure: true,
                sameSite:'strict' // ป้องกันส่ง Cookie ข้าม Do

            })
    res.json({
        message: "Login Success",
        login: true
    })
} else {
      res.clearCookie('token',token,{
                //maxAge:3600000, //3,600,000 ms --> 60 minute -->1hr,
                httpOnly: true, // ป้องกันการเข้าถึง Token ผ่าน JavaScript (ป้องกัน XSS)
                secure: true,
                sameSite:'strict' // ป้องกันส่ง Cookie ข้าม Do
      })
    res.json({
        message: "Login Fail",
        login: false
    })
}

     }catch(err){
        return res.status(500).json({
            message:err.message
        })  
     }
}