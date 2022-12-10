import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/userRouter.js";
import todoRouter from "./routes/todoRouter.js";
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", true);

// VIEW ENGINE
app.set("view engine", "ejs");
app.set("/css", path.resolve(dirname, "/public/css"));

// ROUTES

app.get("/", (req, res) => {
  res.render("index", { pageTitle: "User Todo || Save Your Data" });
});

app.get("/signin", (req, res) => {
  res.render("SignIn", { pageTitle: "Login || Save Your Data" });
});

app.get("/signup", (req, res) => {
  res.render("SignUp", { pageTitle: "Create User || Save Your Data" });
});

app.get("/adduser", (req, res) => {
  res.render("AddUser", { pageTitle: "Add New User|| Save Your Data" });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

// DATABASE CONNECT
mongoose.connect(process.env.MONGODB_URI, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Database connection success`);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`App is running at ${PORT}`);
  }
});
