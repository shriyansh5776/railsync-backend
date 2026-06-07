import mongoose ,{Schema} from "mongoose";

const scheduleSchema = new mongoose.Schema({
    trainId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref :"Train"
    },
    departureTime : {
        type: Number ,
        required : true
    },
    arrivalTime : {
        type: Number ,
        required : true
    },
    runningDays : {
        type: [String] ,
        enum : ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        lowercase:true,
        required : true
    },
    distance : {
        type: Number ,
        required : true
    },
},{timestamps:true})

const Schedule = mongoose.model("Schedule",scheduleSchema);

export default Schedule