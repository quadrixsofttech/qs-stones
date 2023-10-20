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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('kitchen', MealSchema);
