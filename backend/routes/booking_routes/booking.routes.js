import { Router } from "express";
import { cancelBooking, createBooking, getBookingByPNR, myBookings } from "../../controllers/booking/Booking.controller.js";
import userAuth from "../../middleware/auth.middleware.js";

const bookingRouter = Router();

bookingRouter.get("/my-bookings",userAuth,myBookings)
bookingRouter.get("/pnr/:pnrNumber",userAuth,getBookingByPNR)
bookingRouter.post("/:trainId",userAuth,createBooking)
bookingRouter.patch("/:bookingId",userAuth,cancelBooking)


export default bookingRouter