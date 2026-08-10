import express from "express"
import * as productC from "../controller/productController.js"


const route = express.Router()

route.get('/product',productC.getAllProduct)
route.post('/product',productC.postProduct)
route.get('/product/:id',productC.getProductById)
route.put('/product/:id',productC.putProduct)
route.delete('/product/:id',productC.deleteProduct)
route.get('/product/brands/:id',productC.getProductByBrandId)
export default route

