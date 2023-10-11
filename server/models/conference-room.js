const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConferenceRoomSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  equipment: [
    {
      type: {
        type: String,
        enum: ['laptop', 'chalkboard', 'tv', 'wifi'],
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  img: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
    enum: ['Upper Floor', 'Lower Floor'],
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

module.exports = mongoose.model(
  'conference-room-overview',
  ConferenceRoomSchema
);
