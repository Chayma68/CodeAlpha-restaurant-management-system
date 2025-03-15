
const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  ingredient: {
    type: String,
    required: [true, 'Ingredient name is required'],
    unique: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  unit: {
    type: String,
    enum: ['kg', 'liters', 'pieces'],
    required: [true, 'Unit is required']
  },
  lowStockThreshold: {
    type: Number,
    required: [true, 'Low stock threshold is required'],
    min: [0, 'Threshold cannot be negative']
  }
});

module.exports = mongoose.model('Inventory', InventorySchema);
