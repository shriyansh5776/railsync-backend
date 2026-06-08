import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function CreateUser(req, res) {
  try {
    const { password, username, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: " Enter all the credentials",
      });
    }
    const userExists = await User.findOne({ $or: [{ username}, {email }] });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists ",
      });
    }
    const createdUser = await User.create({
      username,
      password: await bcrypt.hash(password, 10),
      email: email,
      role: "passenger",
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "enter all credentials",
      });
    }
    const doesUserExists = await User.findOne({ email });
    if (!doesUserExists) {
      return res.status(404).json({
        success: false,
        message: "User does'nt exists",
      });
    }
    const checkPassword = await bcrypt.compare(
      password,
      doesUserExists.password,
    );
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const token = await jwt.sign(
      { userId: doesUserExists._id, username: doesUserExists.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        email: doesUserExists.email,
        username: doesUserExists.username,
        role : doesUserExists.role
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { CreateUser, userLogin };
