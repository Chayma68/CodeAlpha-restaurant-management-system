const express = require('express');
const { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const validateMenuItem = require('../validation/menuValidator');
const router = express.Router();

// Define Routes
router.get('/', getMenu);
router.post('/', validateMenuItem, addMenuItem); 
router.put('/:id', validateMenuItem, updateMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router;
