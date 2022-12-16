import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { currentUser, verifyToken } from "../middleware/verifyUser.js";
const rootRoutes = express.Router();
const domainName = `https://user-todo-task.vercel.app`;

rootRoutes.get("*", currentUser);

rootRoutes.get("/", verifyToken, async (req, res) => {
  try {
    const { data } = await axios.get(`${domainName}/api/v1/todo`);
    res.render(path.resolve(__dirname + "/views/index"), {
      pageTitle: "User Todo || Save Your Data",
      todos: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

rootRoutes.get("/signin", (req, res) => {
  res.render(path.resolve(__dirname + "/views/Signin"), {
    pageTitle: "Login || Save Your Data",
  });
});

rootRoutes.get("/admin", verifyToken, async (req, res) => {
  const { startDate, endDate } = req.query;

  let url = `${domainName}/api/v1/todo`;

  if (startDate && endDate) {
    url = `${domainName}/api/v1/todo?startDate=${startDate}&endDate=${endDate}`;
  }
  let { data } = await axios.get(url);

  res.render(path.resolve(__dirname + "/views/Admin"), {
    pageTitle: "Admin || Save Your Data",
    todos: data,
  });
});

rootRoutes.get("/signup", (req, res) => {
  res.render(path.resolve(__dirname + "/views/SignUp"), {
    pageTitle: "Create User || Save Your Data",
  });
});

rootRoutes.get("/addtodo", verifyToken, async (req, res) => {
  const { data } = await axios.get(`${domainName}/api/v1/user/demouser`);
  res.render(path.resolve(__dirname + "/views/AddTodo"), {
    pageTitle: "Add New Todo|| Save Your Data",
    users: data,
  });
});

rootRoutes.get("/logout", (req, res) => {
  res.cookie("jwtToken", "", { maxAge: 1 });
  res.redirect("/signin");
});

export default rootRoutes;
