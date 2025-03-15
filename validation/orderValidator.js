const Joi = require('joi');

const orderValidationSchema = Joi.object({
  customerName: Joi.string().min(2).max(50).required(),
  items: Joi.array()
    .items(
      Joi.object({
        menuItem: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required()
      })
    )
    .min(1)
    .required()
});

const validateOrder = (req, res, next) => {
  const { error } = orderValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next(); // Proceed if validation passes
};

module.exports = validateOrder;
