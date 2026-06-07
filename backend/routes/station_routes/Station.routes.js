import { Router } from "express";
import { createStation, deleteStation, getStation, getStationById, updateStation } from "../../controllers/stations/Station.controller.js";
import isRailwayEmployee from "../../middleware/railwayEmployee.middleware.js";
import userAuth from "../../middleware/auth.middleware.js";

const stationRouter = Router();

stationRouter.get("/",getStation)
stationRouter.get("/:station_id",getStationById)
stationRouter.post("/createStation",userAuth,isRailwayEmployee,createStation)
stationRouter.patch("/:station_id",userAuth,isRailwayEmployee,updateStation)
stationRouter.delete("/:station_id",userAuth,isRailwayEmployee,deleteStation)

export default stationRouter