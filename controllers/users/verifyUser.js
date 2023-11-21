import User from "#models/user.js";

export const verifyUser = async (req, res, next) => {
  const verificationToken = req.params.verificationToken;

  try {
    const user = await User.findOne(
      { verificationToken },
      { verificationToken: 1 }
    );

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "User not found",
      });
    }

    user.verificationToken = " ";
    user.verify = true;
    await user.save();

    return res.status(201).json({
      status: "Success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};
