import express from "express"
import * as productC from "../controller/productController.js"


const route = express.Router()

route.get('/product', productC.getAllProduct)

route.get('/product/three', productC.getThreeProduct)

route.get('/product/search/:id', productC.getSearchProduct)

route.get('/product/brands/:id', productC.getProductByBrandId)

route.get('/product/:id', productC.getProductById)

route.put('/product/:id', productC.putProduct)

route.patch('/product/:id', productC.patchProduct)

route.delete('/product/:id', productC.deleteProduct)
export default route

