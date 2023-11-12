import User from "#models/user.js";
import { userSchema, validateData } from "#validators/index.js";

export const registerUser = async (req, res, next) => {
  try {
    const { isValid, errorMessage, value } = validateData(userSchema, req.body);

    if (!isValid) {
      return res.status(400).json({
        message: errorMessage,
      });
    }

    const { email, password } = value;

    const user = await User.findOne({ email }).lean();

    if (user) {
      return res.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email in use",
      });
    }

    const newUser = new User({ email });
    const { subscription } = newUser;

    await newUser.setPassword(password);
    await newUser.save();

    return res.status(201).json({
      status: "Created",
      code: 201,
      data: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};
