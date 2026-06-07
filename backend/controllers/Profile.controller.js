import User from "../models/User.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'buffer'
async function getUserProfile(req, res) {
  try {
    const { userId } = req.user;
    const details = await User.findById(userId);
    if (!details) {
      return res.status(404).json({
        success: false,
        message: "User does not exists",
      });
    }
    return res.status(200).json({
      success: true,
      user: {
        email: details.email,
        userId: details._id,
        username: details.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function changePassword(req,res) {
  try {
    const {email,password , newPassword} = req.body
    if(!email || !password||!newPassword){
      return res.status(403).json({
        success : false ,
        message:"Enter all the fields"
      })
    }
    const userRequired = await User.findOne({email})
    userRequired.password = await bcrypt.hash(newPassword,10)
    return res.status(200).json({
      success : true ,
      message : "Password updated",
      User : userRequired.password
    })
  } catch (error) {
    return res.status(500).json({
      success : true ,
      message : "Something went wrong"
    })
  }
}
export  {getUserProfile,changePassword};
