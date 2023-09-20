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

export default {
  userSignupSchema,
  userSigninSchema,
};
