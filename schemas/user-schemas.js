import Joi from "joi";

const userSignupSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": `Password is required`,
  }),
  email: Joi.string().required().messages({
    "any.required": `Email is required`,
  }),
  subscription: Joi.string()
    .allow("starter", "pro", "business")
    .default("starter"),
  token: Joi.string().default(null),
});

export const userSigninSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": `Password is required`,
  }),
  email: Joi.string().required().messages({
    "any.required": `Email is required`,
  }),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": `Missing required field email`,
  }),
});

export default {
  userSignupSchema,
  userSigninSchema,
  userEmailSchema,
};
