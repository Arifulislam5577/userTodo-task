import mongoose from "mongoose";
const { Schema, model } = mongoose;

const todoSchema = new Schema(
  {
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
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
