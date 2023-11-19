import { validateData } from "#validators/validate.js";

export const bodyValidate = (validator) => {
  return async function (req, res, next) {
    const { isValid, errorMessage, invalidParam } = validateData(
      validator,
      req.body
    );

    if (!isValid) {
      return res.status(400).json({
        message: errorMessage,
        invalidParam,
      });
    }

    return next();
  };
};
