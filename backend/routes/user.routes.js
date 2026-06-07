import { Router } from "express";
import {userLogin,CreateUser} from "../controllers/User.controller.js";
import userAuth from "../middleware/auth.middleware.js";
const userRouter = Router();
userRouter.post('/signup',CreateUser)
userRouter.post('/login',userLogin)
export default userRouter