const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  bio: { type: String, required: false },
  vacation: [
    {
      year: { type: Number, required: true, default: new Date().getFullYear() },
      vacationDays: { type: Number, default: 20 },
      usedDays: { type: Number, default: 0 },
    },
  ],
  active: { type: Boolean, required: true, default: true },
});
module.exports = mongoose.model('user', UserSchema);
