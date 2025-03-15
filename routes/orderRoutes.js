const express = require('express');
const { placeOrder, getOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const validateOrder = require('../validation/orderValidator');

const router = express.Router();

// Define Order Routes

router.get('/', getOrders);    // Get all orders
router.put('/:id', updateOrderStatus); // Update order status
router.delete('/:id', deleteOrder);    // Delete an order
router.post('/', validateOrder, placeOrder);


module.exports = router;
