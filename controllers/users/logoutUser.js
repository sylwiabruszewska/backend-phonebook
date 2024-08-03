import User from "#models/user.js";

export const logoutUser = async (req, res, next) => {
  try {
    const result = await User.findByIdAndUpdate(req.user.id, { token: null });

    if (!result) {
      return res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "User not found",
      });
    }

    req.user = null;

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
