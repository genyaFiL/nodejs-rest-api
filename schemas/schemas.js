import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name" field`,
  }),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

export default {
  contactAddSchema,
  contactPutSchema,
};
