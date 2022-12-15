import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decoded.id).select("-password");

    if (user) {
      res.user = user;
      res.locals.user = user;
      next();
    } else {
      res.locals.user = null;
      res.redirect("/signin");
    }
  } else {
    res.locals.user = null;
    res.redirect("/signin");
  }
};

// Current User

export const currentUser = async (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decoded.id).select("-password");

    if (user) {
      res.locals.user = user;
      next();
    } else {
      res.locals.user = null;
      next();
    }
  } else {
    res.locals.user = null;
    next();
  }
};
