const Joi = require('joi');

const reservationValidationSchema = Joi.object({
  customerName: Joi.string().min(2).required(),
  tableNumber: Joi.number().integer().positive().required(),
  reservationTime: Joi.date().iso().required(),
  numGuests: Joi.number().integer().min(1).max(4).required(),
  status: Joi.string().valid('Reserved', 'Completed', 'Cancelled').default('Reserved'),
});

function validateReservation(req, res, next) {
    const { error } = reservationValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

module.exports = validateReservation;
