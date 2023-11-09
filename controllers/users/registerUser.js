import User from "#models/user.js";

export const registerUser = async (req, res, next) => {
  const { email, password } = req.body;

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
};
