import User from "#models/user.js";
import { subscriptionSchema, validateData } from "#validators/index.js";

export const updateUserSub = async (req, res, next) => {
  const { user, body } = req;

  try {
    const { isValid, errorMessage, value } = validateData(
      subscriptionSchema,
      body
    );

    if (!isValid) {
      return res.status(400).json({
        message: errorMessage,
      });
    }

    const { subscription } = value;

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
