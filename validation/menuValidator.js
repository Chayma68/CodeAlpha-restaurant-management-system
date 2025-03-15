const Joi = require('joi');

const menuValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().min(2).max(50).required(),
  description: Joi.string().max(255),
  availability: Joi.boolean()
});

const validateMenuItem = (req, res, next) => {
  const { error } = menuValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateMenuItem;
