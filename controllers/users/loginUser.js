import User from "#models/user.js";

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const isPasswordValid = await user.validPassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Email or password is wrong",
    });
  }

  return res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};
