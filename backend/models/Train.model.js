import mongoose , {Schema} from "mongoose"

const trainSchema = new mongoose.Schema({
    train_number :{
        type : Number,
        unique : true ,
        required  : true ,
        trim : true 
    },
    train_name : {
        type : String ,
        lowercase : true ,
        trim : true ,
    },
    train_type : {
        enum : ["express" , "rajdhani" , "shatabdi","superfast"],
        type : String,
        lowercase : true 
    },
    sourceStation:{
        type :  Schema.Types.ObjectId,
        required : true ,
        ref : "Station"
    },
    destinationStation:{
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : "Station"
    },
    totalSeats:{
        type : Number ,
        required : true ,
    },
    availableSeats:{
        type : Number ,
        required : true ,
    },
    
},{timestamps:true})

const Train = mongoose.model("Train",trainSchema)

export default Train