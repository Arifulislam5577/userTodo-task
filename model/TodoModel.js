import mongoose from "mongoose";
const { Schema, model } = mongoose;

const todoSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    numbers: {
      type: Number,
      required: true,
    },
  },
  { timeStamp: true }
);

const TodoModel = model("todo", todoSchema);

export default TodoModel;
