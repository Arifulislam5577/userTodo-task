import express from "express";
import axios from "axios";
const rootRoutes = express.Router();

rootRoutes.get("/", async (req, res) => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/v1/todo");
    res.render("index", {
      pageTitle: "User Todo || Save Your Data",
      todos: data,
    });
  } catch (error) {
    res.send(error);
  }
});

rootRoutes.get("/signin", (req, res) => {
  res.render("SignIn", { pageTitle: "Login || Save Your Data" });
});

rootRoutes.get("/signup", (req, res) => {
  res.render("SignUp", { pageTitle: "Create User || Save Your Data" });
});

rootRoutes.get("/addtodo", (req, res) => {
  res.render("AddTodo", { pageTitle: "Add New Todo|| Save Your Data" });
});

export default rootRoutes;
