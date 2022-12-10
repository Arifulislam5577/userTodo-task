import express from "express";
import { signin, signup } from "../controllers/userControllers.js";
const userRouter = express.Router();

userRouter.route("/signup").post(signup);
userRouter.route("/signin").post(signin);

export default userRouter;
