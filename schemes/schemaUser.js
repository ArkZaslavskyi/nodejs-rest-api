const Joi = require("joi");

const passwordRegExp = /^[a-zA-Z][a-zA-Z0-9]*$/;

const schemaUser = Joi.object({
  password: Joi.string().pattern(passwordRegExp).min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
});

module.exports = {
  schemaUser,
};
