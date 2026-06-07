import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
import User from "./models/User.model.js";

configDotenv();

async function seedEmployee() {
  try {
    await mongoose.connect(process.env.DB_URL);

    const employeeExists = await User.findOne({
      role: "railway_employee",
    });

    if (employeeExists) {
      console.log("Railway employee already exists");
      process.exit(0);
    }

    await User.create({
      username: process.env.SEED_EMPLOYEE_USERNAME,
      email: process.env.SEED_EMPLOYEE_EMAIL,
      password: await bcrypt.hash(process.env.SEED_EMPLOYEE_PASSWORD, 10),
      role: "railway_employee",
    });

    console.log("Railway employee created successfully");
    mongoose.connection.close()
    process.exit(0);
} catch (error) {
    console.log(error.message);
    mongoose.connection.close()
    process.exit(1);
  }
}

seedEmployee();