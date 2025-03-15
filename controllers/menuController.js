const Menu = require('../models/menu');  
// Get all menu items
const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
};

// Add a new menu item
const addMenuItem = async (req, res) => {
  try {
    const { name, price, category, description, availability } = req.body;
    const newItem = new Menu({ name, price, category, description, availability });
    await newItem.save();
    res.status(201).json({ message: 'Menu item added', item: newItem });
  } catch (error) {
    res.status(400).json({ message: 'Error adding menu item', error });
  }
};

// Update a menu item
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Menu.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json({ message: 'Menu item updated', item: updatedItem });
  } catch (error) {
    res.status(400).json({ message: 'Error updating menu item', error });
  }
};

// Delete a menu item
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Menu.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error });
  }
};

module.exports = { getMenu, addMenuItem, updateMenuItem, deleteMenuItem };
