import User from "#models/user.js";

export const getCurrentUser = async (req, res, next) => {
  const user = req.user;

  try {
    const currentUser = await User.findById(user.id);

    res.json({
      email: user.email,
      subscription: currentUser.subscription,
      avatarURL: currentUser.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};
