import mongoose from "mongoose";
const { Schema, model } = mongoose;

const demoUserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DemoUser = model("demouser", demoUserSchema);

export default DemoUser;
