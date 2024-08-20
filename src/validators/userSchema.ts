import Joi from "joi";

export const registerValidationSchema = Joi.object({
  name: Joi.string().max(40).required(),
  email: Joi.string().email().max(40).required(),
  password: Joi.string().min(8).max(40).required(),
});

export const loginValidationSchema = Joi.object({
  email: Joi.string().email().max(40).required(),
  password: Joi.string().min(8).max(40).required(),
});

export const emailValidationSchema = Joi.object({
  email: Joi.string().email().max(40).required(),
});
