import database from "../services/database.js";



export async function getProductById(req,res) {
    console.log(`GET it requested`)
         
         try{
           
            const result = await database.query({
                text:`SELECT p.*,
(
SELECT row_to_json(brand_obj) FROM (
		SELECT "brandId","brandName" FROM brands
		WHERE "brandId" = p."brandId"
) brand_obj
) As brand,

(
SELECT row_to_json(pdt_obj) FROM (
		SELECT "pdTypeId","pdTypeName" FROM  "pdTypes"
		WHERE "pdTypeId" = p."pdTypeId"
) pdt_obj
) AS pdt

FROM products p
WHERE p. "pdId" = $1`,
values:[req.params.id]
            })
            return res.status(200).json(result.rows)
         }catch(err){
            return res.status(500).json({
                message:err.message
            })
            
        }
}


export async function getAllProduct(req,res) {
    console.log(`GET it requested`)
         
         try{
            const sqlsty = `SELECT p.*,
(
SELECT row_to_json(brand_obj) FROM (
		SELECT "brandId","brandName" FROM brands
		WHERE "brandId" = p."brandId"
) brand_obj
) As brand,

(
SELECT row_to_json(pdt_obj) FROM (
		SELECT "pdTypeId","pdTypeName" FROM  "pdTypes"
		WHERE "pdTypeId" = p."pdTypeId"
) pdt_obj
) AS pdt

FROM products p` 
            const result = await database.query(sqlsty)
            return res.status(200).json(result.rows)
         }catch(err){
            return res.status(500).json({
                message:err.message
            })
            
        }
}

export async function postProduct(req,res) {
    console.log(`POST /products is requested`)
    const bodyData = req.body 

    try{

        if(!bodyData.pdId || !bodyData.pdName){
            return res.status(422).json({message:`ERROR pdId and pdName is requried`})
        }

        const chkRow = await database.query({
            text:`SELECT * FROM products WHERE "pdId" = $1`,
            values:[bodyData.pdId]
        })

        if(chkRow.rowCount != 0){
            res.status(409).json({message:`ERROR pdId ${bodyData.pdId} is exists`})
        }
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

     }catch(err){
            res.status(500).json({
            message:err.message
        })  
     }
}