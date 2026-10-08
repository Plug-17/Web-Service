import express from "express"
import * as productC from "../controller/productController.js"

const route = express.Router()

route.get('/products', productC.getAllProduct)

route.get('/products/three', productC.getThreeProduct)

route.get('/products/search/:id', productC.getSearchProduct)

route.get('/products/brands/:id', productC.getProductByBrandId)

route.get('/products/:id', productC.getProductById)

route.put('/products/:id', productC.putProduct)

route.patch('/products/:id', productC.patchProduct)

route.delete('/products/:id', productC.deleteProduct)
route.post('/products/:id', productC.postProduct)

export default route

