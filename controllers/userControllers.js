import UserModel from "../model/UserModel.js";

// CREATE USER
export const signup = async (req, res) => {
  const { userName, password, email } = req.body;

  const user = new UserModel({ userName, password, email });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN USER

export const signin = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (user && (await user.matchPassword(password))) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid password/email" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
