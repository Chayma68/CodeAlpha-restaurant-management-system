const express = require('express');
const { addInventoryItem, getInventory, updateInventory, getLowStockItems } = require('../controllers/inventoryController');
const validateInventory = require('../validation/inventoryValidator');

const router = express.Router();

// Define Inventory Routes
router.post('/', validateInventory, addInventoryItem); // Add new ingredient
router.get('/', getInventory); // Get all inventory items
router.put('/:id', validateInventory, updateInventory); // Update stock levels
router.get('/low-stock', getLowStockItems); // Get low stock alerts

module.exports = router;
