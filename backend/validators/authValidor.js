
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required'
    }),

  mail: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),

  pass: Joi.string()
    .min(8)
    .max(100)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 100 characters',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      'any.required': 'Password is required'
    })
});

module.exports = { registerSchema };
