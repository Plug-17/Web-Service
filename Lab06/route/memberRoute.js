import express from "express"
import * as memberC from "../controller/memberController.js"


const route = express.Router()

route.post("/members",memberC.postMember)
route.get("/members/logout",memberC.logoutMember)
route.post("/members/login",memberC.loginMember)
route.get("/members/detalis",memberC.getMember)


export default route