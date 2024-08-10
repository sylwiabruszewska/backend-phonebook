import User from "#models/user.js";

export const verifyUser = async (req, res, next) => {
  const verificationToken = req.params.verificationToken;

  try {
    const user = await User.findOneAndUpdate(
      { verificationToken },
      {
        verificationToken: " ",
        verify: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "Success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};
