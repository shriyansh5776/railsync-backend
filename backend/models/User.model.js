import mongoose from "mongoose";


const userSchema = new  mongoose.Schema(
    {
        username : {
            type : String ,
            required:true,
            unique: true ,
            trim : true 
        },
        password : {
            type : String,
            required : true ,
            trim : true
        },
        email : {
            type : String ,
            required : true ,
            unique : true ,
            trim : true
        },
        role : {
            type : String ,
            required : true ,
            enum : ["passenger" , "railway_employee" ],
            default : "passenger",
            trim : true
        }
    },{timestamps:true}
)

const User = mongoose.model("User",userSchema);

export default User;