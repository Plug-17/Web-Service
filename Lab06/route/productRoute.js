import express from "express"

import { deleteProduct, getAllProduct, getProductById, postProduct, putProduct } from "../controller/productController.js"

const route = express.Router()

route.get('/product',getAllProduct)
route.post('/product',postProduct)
route.get('/product/:id',getProductById)
route.put('/product/:id',putProduct)
route.delete('/product/:id',deleteProduct)
export default route

