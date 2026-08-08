import express from "express"

import { getAllProduct, getProductById, postProduct, putProduct } from "../controller/productController.js"

const route = express.Router()

route.get('/product',getAllProduct)
route.post('/product',postProduct)
route.get('/product/:id',getProductById)
route.put('/product/:pdId',putProduct)
export default route

