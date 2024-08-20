import Joi from "joi";

export const contactValidationSchema = Joi.object({
  name: Joi.string().max(40).required(),
  email: Joi.string().email().max(40),
  phone: Joi.string().max(40).required(),
});

export const editContactValidationSchema = Joi.object({
  name: Joi.string().max(40),
  email: Joi.string().email().max(40),
  phone: Joi.string().max(40),
});
