import mongoose from "mongoose";
const stationSchema = new mongoose.Schema({
    station_code : {
        type :Number ,
        required :true,
        unique  :true 
    },
    station_name : {
        type :String ,
        required :true,
        unique  :true 
    },
    city : {
        type :String ,
        required :true,
    },
    state : {
        type :String ,
        required :true,
    },
},{timestamps:true})
const Station = mongoose.model("Station",stationSchema);
export default Station