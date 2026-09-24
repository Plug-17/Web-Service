import { createRouter,createWebHistory } from "vue-router"
import TheProduct from "@/conponents/TheProduct.vue"
import TheLogin from "@/conponents/TheLogin.vue"
import TheHome from "@/conponents/TheHome.vue"
import TheRegister from "@/conponents/TheRegister.vue"
import PageMember from "@/conponents/PageMember.vue"
import ProductShow from "@/conponents/ProductShow.vue"
import CartShow from "../conponents/CartShow.vue"
import CartList from "../conponents/CartList.vue"
const routes = [
    {
        path:'/',
        name:'home',
        component:TheHome
    },
    {
        path:'/product',
        name:'product',
        component:TheProduct
    },
    {
        path:'/login',
        name:'Login',
        component:TheLogin
    },
    {
        
        path:'/register',
        name:'Register',
        component:TheRegister
    },
    {
        path:'/pagemember',
        name:'PageMember',
        component:PageMember
    },
    {
         // กำหนดว่า route นี้รับ parameter ต้องระบุให้ตรงกันด้วย
        path:'/ProductShow/:pdId',
        name:'ProductShow',
        component:ProductShow

    },  
    {
        // กำหนดว่า route นี้รับ parameter ต้องระบุให้ตรงกันด้วย
        path:'/cartShow/:cartId',
        name:'CartShow',
        component:CartShow
    },
    {
         path:'/cartList/',
        name:'CartList',
        component:CartList

    }


]
const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),routes
})
export default router
