import mongoose, { Schema } from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId,
        required:true,
    },
    trainId : {
        type : Schema.Types.ObjectId,
        required:true, 
        ref : "Train"
    },
    bookingStatus : {
        type : String,
        trim:true ,
        required:true,
        enum : ["confirmed","cancelled" , "waiting"] 
    },
    bookingDate : {
        type : Date,
        trim:true ,
        required:true,
    },
    seatCount : {
        type : Number,
        required:true,
    },
    totalFare : {
        type : Number,
        required:true,
    },
    pnrNumber : {
        type : String,
        required : true ,
        unique : true
    }
})

const Booking =  mongoose.model("Booking",bookingSchema);
export default Booking