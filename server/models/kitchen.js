const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const MealSchema = new Scheme({
  name: {
    type: String,
    required: true,
  },
  ingridients: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    enum: ['main dish', 'salad'],
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('kitchen', MealSchema);
