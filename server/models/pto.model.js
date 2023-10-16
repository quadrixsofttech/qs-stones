const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PtoSchema = new Schema({
  type: {
    type: String,
    enum: ['vacation', 'remote'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  reviewerId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

  dates: {
    type: [[String, String]],
    required: true,
  },
  days: {
    type: [String],
    required: true,
  },
  comment: {
    type: String,
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

module.exports = mongoose.model('pto', PtoSchema);
