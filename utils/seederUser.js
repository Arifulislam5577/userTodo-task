import mongoose from "mongoose";
import dotenv from "dotenv";
import DemoUser from "../model/DemoUser.js";
import { demouser } from "./demoUser.js";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connect to database");
});
mongoose.set("strictQuery", true);
const seedUser = async () => {
  try {
    await DemoUser.deleteMany();
    console.log("user delete");
    await DemoUser.insertMany(demouser);
    console.log("Product added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedUser();
