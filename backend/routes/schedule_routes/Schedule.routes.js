import { Router } from "express";
import userAuth from "../../middleware/auth.middleware.js";
import isRailwayEmployee from "../../middleware/railwayEmployee.middleware.js";
import { createSchedule, deleteSchedule, getScheduleById, getScheduleByTrainId, updateSchedule ,getAllSchedules } from "../../controllers/schedule/Schedule.controller.js";

const scheduleRouter =Router()
scheduleRouter.get("/", userAuth, getAllSchedules);
scheduleRouter.post("/create",userAuth,isRailwayEmployee,createSchedule)
scheduleRouter.get("/train/:trainId",userAuth,isRailwayEmployee,getScheduleByTrainId)
scheduleRouter.get("/:id",userAuth,isRailwayEmployee,getScheduleById)
scheduleRouter.patch("/train/:id",userAuth,isRailwayEmployee,updateSchedule)
scheduleRouter.delete("/:id",userAuth,isRailwayEmployee,deleteSchedule)




export default scheduleRouter 
