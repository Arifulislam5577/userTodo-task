import express from "express";
import { signin, signup, getDemoUser } from "../controllers/userControllers.js";
const userRouter = express.Router();

userRouter.route("/signup").post(signup);
userRouter.route("/signin").post(signin);
userRouter.route("/demoUser").get(getDemoUser);

export default userRouter;
