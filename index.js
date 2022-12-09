import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/userRouter.js";
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
  res.render("index");
});

app.use("/api/v1/user", userRouter);

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
