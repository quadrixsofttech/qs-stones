const KitchenModel = require('../../models/kitchen');

const createMeal = async ({ name, ingridients, type, desc, image }) => {
  try {
    const newMeal = new KitchenModel({ name, ingridients, type, desc, image });
    await newMeal.save();
    return newMeal;
  } catch (err) {
    throw new Error(err);
  }
};

const getMeals = async () => {
  try {
    const meals = await KitchenModel.find().lean();
    return meals;
  } catch (err) {
    throw new Error(err);
  }
};

const updateMeal = async (id, update) => {
  try {
    const updateMeal = await KitchenModel.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );
    return updateMeal;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteMeal = async (id) => {
  try {
    const deleteMeal = await KitchenModel.findByIdAndDelete(id);
    return deleteMeal;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createMeal,
  getMeals,
  updateMeal,
  deleteMeal,
};
