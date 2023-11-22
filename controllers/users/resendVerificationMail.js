import User from "#models/user.js";
import { sendVerificationMail, validateData } from "#helpers/index.js";
import { userSchema } from "#validators/index.js";

export const resendVerificationMail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: "Bad Request",
      code: 400,
      message: "Missing required field email",
    });
  }

  await validateData(userSchema, { email });

  try {
    const user = await User.findOne({ email });

    if (user.verify) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Verification has already been passed",
      });
    }

    await sendVerificationMail(email, user.verificationToken);

    return res.status(201).json({
      status: "Success",
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};
