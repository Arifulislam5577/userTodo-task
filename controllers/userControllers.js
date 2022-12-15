import UserModel from "../model/UserModel.js";
import DemoUser from "../model/DemoUser.js";
import { generateToken } from "../utils/generateToken.js";

// CREATE USER
export const signup = async (req, res) => {
  const { userName, password, email } = req.body;

  const findUser = await UserModel.findOne({ email });

  if (findUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const user = new UserModel({ userName, password, email });
    const newUser = await user.save();
    const jwtToken = generateToken(newUser._id);
    res.cookie("jwtToken", jwtToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ userRole: user.role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGIN USER

export const signin = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const jwtToken = generateToken(user._id);
      res.cookie("jwtToken", jwtToken, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json({ userRole: user.role });
    } else {
      res.status(401).json({ message: "Invalid password/email" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET DEMO USER

export const getDemoUser = async (req, res) => {
  try {
    const users = await DemoUser.find();
    if (users) {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
