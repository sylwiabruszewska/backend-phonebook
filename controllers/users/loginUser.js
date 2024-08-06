import jwt from "jsonwebtoken";
import { config } from "dotenv";

import User from "#models/user.js";

config();
const secret = process.env.SECRET;

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
    }

    const isPasswordValid = await user.validPassword(password);

    if (!user.verify) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email not verified",
      });
    }

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
    }

    const { id, name, subscription, avatarURL } = user;
    const token = jwt.sign({ id }, secret, { expiresIn: "12h" });

    await User.findByIdAndUpdate(user.id, { token });

    return res.status(200).json({
      status: "OK",
      code: 200,
      token: token,
      data: {
        user: {
          name: name,
          email: email,
          subscription: subscription,
          avatarURL: avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
