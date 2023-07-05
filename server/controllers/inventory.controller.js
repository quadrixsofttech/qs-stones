const { StatusCodes } = require('http-status-codes');
const InventoryService = require('../services/inventory/inventory.service');

const createItem = async (req, res) => {
  try {
    const userid = req.user.sub;
    const itemData = req.body;
    const createdItem = await InventoryService.createItemForUser(
      userid,
      itemData
    );
    return res.send(createdItem);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'There was a problem creating the item',
    });
  }
};

const getItem = async (req, res) => {
  try {
    const userId = req.user.sub;
    const item = await InventoryService.getItemForUser(userId);
    return res.send(item);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'There was a problem getting the item',
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.sub;
    const deletedItem = await InventoryService.deleteItemForUser(
      itemId,
      userId
    );
    return res.send(deletedItem);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'There was a problem deleting the item',
    });
  }
};

module.exports = { createItem, getItem, deleteItem };
