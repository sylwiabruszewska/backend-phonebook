import User from "#models/user.js";

export const updateUserSub = async (req, res, next) => {
  try {
    const { user } = req;
    const { subscription } = req.body;

    const { email, avatarURL } = await User.findByIdAndUpdate(user.id, {
      subscription,
    });
    return res.status(201).json({
      status: "Success",
      code: 200,
      data: { email, subscription, avatarURL },
    });
  } catch (error) {
    next(error);
  }
};
