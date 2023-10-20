const KitchenService = require('../services/kitchen/kitchen.service');
const { StatusCodes } = require('http-status-codes');

const uploadImage = (req, res) => {
  KitchenModel.create({ image: req.file.filename })
    .then((result) => res(result))
    .catch((err) => console.error(err));
};

const getMealImage = (req, res) => {
  KitchenModel.find()
    .then((meal) => res.json(meal))
    .catch((err) => res.json(err));
};

const createMeal = async (req, res) => {
  try {
    const { name, ingridients, type, desc, image } = req.body;

    const meal = await KitchenService.createMeal({
      name,
      ingridients,
      type,
      desc,
      image,
    });
    res.send(meal);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Cannot create meal' });
  }
};

const getMeals = async (req, res) => {
  try {
    const meals = await KitchenService.getMeals();
    return res.json(meals);
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: 'Cannot get meals' });
  }
};

const updateMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, update } = req.body;
    const meal = await KitchenService.updateMeal(id, { update });
    return res.json(meal);
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: 'Cannot update meal' });
  }
};

const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await KitchenService.deleteMeal(id);
    return res.send(deleted);
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: err.message });
  }
};

module.exports = {
  uploadImage,
  getMealImage,
  createMeal,
  getMeals,
  updateMeal,
  deleteMeal,
};
