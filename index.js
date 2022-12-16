import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./apiRoutes/userRouter.js";
import todoRouter from "./apiRoutes/todoRouter.js";
import rootRoutes from "./routes/rootRouter.js";

dotenv.config();
const app = express();

// DEFAULT MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
mongoose.set("strictQuery", true);

// VIEW ENGINE
app.set("view engine", "ejs");

// CLIENT SIDE ROUTES

app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(`${domainName}/api/v1/todo`);
    res.render("index", {
      pageTitle: "User Todo || Save Your Data",
      todos: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use("/", rootRoutes);

// API ROUTES

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
