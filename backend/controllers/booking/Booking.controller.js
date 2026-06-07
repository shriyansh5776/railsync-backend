import Booking from "../../models/Booking.model.js";
import Train from "../../models/Train.model.js";



async function createBooking(req, res) {
  try {
    const { seats } = req.body;
    if (!seats || seats <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid seat count",
      });
    }
    const trainId = req.params.trainId;
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }
    if (train.availableSeats < seats) {
      return res.status(403).json({
        success: false,
        message: "Requested seats not available",
      });
    }
    const pnr =  Math.floor(
      1000000000 + Math.random() * 9000000000
    )
    const booking = await Booking.create({
      userId: req.user.userId,
      trainId: train._id,
      bookingStatus: "confirmed",
      bookingDate: new Date(),
      seatCount: seats,
      totalFare: seats * 100,
      pnrNumber : pnr
    });
    train.availableSeats -= seats;
    await train.save();

    return res.status(201).json({
      success: true,
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function myBookings(req, res) {
  try {
    const usersBooking = await Booking.find({
      userId: req.user.userId,
    }).populate("trainId");
    return res.status(200).json({
      success: true,
      bookings: usersBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      bookings: error.message,
    });
  }
}
async function cancelBooking(req, res) {
  try {
    const bookingId = req.params.bookingId;
    const doesExists = await Booking.findById(bookingId);
    if (!doesExists) {
      return res.status(404).json({
        success: false,
        message: "Booking does not exists",
      });
    }
    if (!(doesExists.userId.toString() === req.user.userId)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const trainId = doesExists.trainId;
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Associated train not found",
      });
    }
    if (doesExists.bookingStatus === "cancelled") {
      return res.status(403).json({
        success: false,
        message: "Booking already cancelled",
      });
    }

    train.availableSeats += doesExists.seatCount;
    doesExists.bookingStatus = "cancelled";
    await doesExists.save();
    await train.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function getBookingByPNR(req,res) {
  try {
    const {pnrNumber} =req.params
    const booking =await Booking.findOne({pnrNumber}).populate("trainId");
    if(!booking){
      return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
    }
    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}
export { createBooking, myBookings, cancelBooking,getBookingByPNR };
