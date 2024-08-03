import User from "#models/user.js";
import { sendVerificationMail, validateData } from "#helpers/index.js";
import { emailValidationSchema } from "#validators/index.js";

export const resendVerificationMail = async (req, res, next) => {
  const { email } = req.body;

  validateData(emailValidationSchema, { email });

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "User not found",
      });
    }

    if (user.verify) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Verification has already been passed",
      });
    }

    await sendVerificationMail(email, user.verificationToken);

    return res.status(200).json({
      status: "Success",
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};
