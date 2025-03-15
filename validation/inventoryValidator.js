const Joi = require('joi');

const inventoryValidationSchema = Joi.object({
  ingredient: Joi.string().min(2).required(),
  quantity: Joi.number().min(0).required(),
  unit: Joi.string().valid('kg', 'liters', 'pieces').required(),
  lowStockThreshold: Joi.number().min(0).required()
});

function validateInventory(req, res, next) {
  const { error } = inventoryValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = validateInventory;
