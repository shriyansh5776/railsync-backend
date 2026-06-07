import { Router } from "express";
import { createTrain,  deleteTrain,  getTrainByNumber, getTrains, getTrainsById, updateDetails,searchTrain } from "../controllers/Train.controller.js";
import isRailwayEmployee from "../middleware/railwayEmployee.middleware.js";
import userAuth from "../middleware/auth.middleware.js";


const trainRouter = Router();


trainRouter.post("/create_train",userAuth ,isRailwayEmployee,createTrain)
trainRouter.get("/trains",getTrains)
trainRouter.get("/number/:trainNumber",getTrainByNumber)
trainRouter.get("/search",userAuth,searchTrain)
trainRouter.get("/:id",getTrainsById)
trainRouter.patch("/:trainNumber",userAuth,isRailwayEmployee,updateDetails)
trainRouter.delete("/:trainNumber",userAuth,isRailwayEmployee,deleteTrain)


export default trainRouter