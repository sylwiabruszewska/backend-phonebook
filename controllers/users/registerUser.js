import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";

import User from "#models/user.js";
import { sendVerificationMail } from "#helpers/index.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email in use",
      });
    }
    const verificationToken = uuidv4();

    const newUser = await new User({ name, email, verificationToken });
    const { subscription } = newUser;
    const avatarURL = gravatar.url(email, { s: "250", d: "identicon" });
    newUser.avatarURL = avatarURL;

    await newUser.setPassword(password);
    await newUser.save();

    await sendVerificationMail(email, verificationToken);

    return res.status(201).json({
      status: "Created",
      code: 201,
      data: { name, email, subscription, avatarURL, verificationToken },
    });
  } catch (error) {
    next(error);
  }
};
