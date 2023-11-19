import User from "#models/user.js";

export const logoutUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    req.user = null;
  } catch (error) {
    next(error);
  }
  return res.status(204).end();
};
