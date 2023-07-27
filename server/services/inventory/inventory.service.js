const InventoryItem = require('../../models/inventory-item.model');

const createItemForUser = async (userId, itemData) => {
  try {
    const input = {
      user: userId,
      ...itemData,
    };
    const inventoryItem = new InventoryItem(input);
    await inventoryItem.save();
    return inventoryItem;
  } catch (err) {
    throw new Error(err);
  }
};

const getItemForUser = async (userId) => {
  try {
    const user = userId;
    const inventoryItems = await InventoryItem.find({
      user,
    });
    return inventoryItems;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteItemForUser = async (itemId, userId) => {
  try {
    const deletedItem = await InventoryItem.findOneAndDelete({
      _id: itemId,
      user: userId,
    });
    return deletedItem;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { getItemForUser, createItemForUser, deleteItemForUser };
