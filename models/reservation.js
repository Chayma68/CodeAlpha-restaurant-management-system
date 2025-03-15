const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
  },
  tableNumber: {
    type: Number,
    required: [true, 'Table number is required'],
  },
  reservationTime: {
    type: Date,
    required: [true, 'Reservation time is required'],
  },
  numGuests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'Must have at least 1 guest'],
  },
  status: {
    type: String,
    enum: ['Reserved', 'Completed', 'Cancelled'],
    default: 'Reserved',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reservation', ReservationSchema);
