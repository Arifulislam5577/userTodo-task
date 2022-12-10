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
    token: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const TodoModel = model("todo", todoSchema);

export default TodoModel;
