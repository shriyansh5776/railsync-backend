import { Router } from "express";
import userAuth from "../middleware/auth.middleware.js";
import {getUserProfile,  changePassword } from "../controllers/Profile.controller.js";

const profileRouter = Router()

profileRouter.get('/getDetails',userAuth,getUserProfile)
profileRouter.patch('/updatePassword',userAuth,changePassword)
export default profileRouter