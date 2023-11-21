import User from "#models/user.js";
import gravatar from "gravatar";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email in use",
      });
    }

    const newUser = await new User({ email });
    const { subscription } = newUser;
    const avatarURL = gravatar.url(email, { s: "250", d: "identicon" });
    newUser.avatarURL = avatarURL;

    await newUser.setPassword(password);
    await newUser.save();

    return res.status(201).json({
      status: "Created",
      code: 201,
      data: { email, subscription, avatarURL },
    });
  } catch (error) {
    next(error);
  }
};
