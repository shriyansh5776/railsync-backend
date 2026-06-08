import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { Router } from "express";
import userRouter from './routes/user.routes.js';
import profileRouter from "./routes/profile.routes.js";
import trainRouter from './routes/Train.routes.js'
import bookingRouter from "./routes/booking_routes/booking.routes.js";
import stationRouter from "./routes/station_routes/Station.routes.js";
import scheduleRouter from "./routes/schedule_routes/Schedule.routes.js";
import dataRouter from "./routes/data.route.js";

import cors from "cors";
const app = express();
app.use(cors());
configDotenv();
const PORT = process.env.PORT || 5000;
const router = Router()
app.use(express.json())
router.get("/",(req,res)=>{
  return res.json({
    message : "Server is running"
  })
})
app.use('/',router)
const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server Running At http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

app.use("/data", dataRouter);
app.use('/api/auth',userRouter)
app.use('/profile',profileRouter)
app.use('/train',trainRouter)
app.use('/booking',bookingRouter)
app.use("/stations",stationRouter)
app.use("/schedule",scheduleRouter)
startServer()

