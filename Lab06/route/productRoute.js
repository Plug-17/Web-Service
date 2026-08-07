import express from "express"

import { getAllProduct, getProductById, postProduct } from "../controller/productController.js"

const route = express.Router()

route.get('/product',getAllProduct)
route.post('/product',postProduct)
route.get('/product/:id',getProductById)
export default route

