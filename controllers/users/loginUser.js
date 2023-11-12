import User from "#models/user.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const secret = process.env.SECRET;

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const { id, subscription } = user;

    const isPasswordValid = await user.validPassword(password);

    if (!user || !isPasswordValid) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
    }

    const token = jwt.sign({ id }, secret, { expiresIn: "12h" });

    user.token = token;
    await user.save();

    return res.status(200).json({
      status: "OK",
      code: 200,
      data: {
        token: token,
        user: {
          email: email,
          subscription: subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
