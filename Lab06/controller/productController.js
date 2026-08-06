import database from "../services/database";

export async function getAllProduct(req,res) {
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
}