const InventoryItem = require('../data/InventoryItem');

const getItem = async (req, res) => {
  try {
    const user = req.user.sub;
    const inventoryItems = await InventoryItem.find({
      user,
    });
    res.json(inventoryItems);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const createItem = async (req, res) => {
  try {
    const userId = req.user.sub;
    const input = Object.assign({}, req.body, {
      user: userId,
    });
    const inventoryItem = new InventoryItem(input);
    await inventoryItem.save();
    res.status(201).json({
      message: 'Inventory item created!',
      inventoryItem,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was a problem creating the item',
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const deletedItem = await InventoryItem.findOneAndDelete({
      _id: req.params.id,
      user: req.user.sub,
    });
    res.status(201).json({
      message: 'Inventory item deleted!',
      deletedItem,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was a problem deleting the item.',
    });
  }
};

module.exports = { getItem, createItem, deleteItem };
