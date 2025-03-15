const Inventory = require('../models/inventory');

// Add a new ingredient to inventory
const addInventoryItem = async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    await newItem.save();
    res.status(201).json({ message: 'Ingredient added successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding inventory item', error });
  }
};

// Get all inventory items
const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error });
  }
};

// Update inventory (increase or decrease stock)
const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Inventory.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedItem) return res.status(404).json({ message: 'Ingredient not found' });

    res.status(200).json({ message: 'Inventory updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error });
  }
};

// Get low stock alerts
const getLowStockItems = async (req, res) => {
  try {
    const lowStockItems = await Inventory.find({
        $expr: { $lt: ["$quantity", "$lowStockThreshold"] }});

    res.status(200).json({ lowStockItems });
  } catch (error) {
    console.error("Low Stock Error:", error);
    res.status(500).json({ message: 'Error checking low stock items', error });
  }
};

module.exports = { addInventoryItem, getInventory, updateInventory, getLowStockItems };
