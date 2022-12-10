import express from "express";
import { createTodos, getAllTodos } from "../controllers/todoControllers.js";
const todoRouter = express.Router();

todoRouter.route("/").post(createTodos).get(getAllTodos);

export default todoRouter;
