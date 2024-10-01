const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const ConferenceRoomReservationSchema = new Schema({
  conferenceRoom: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "conference-room-overview",
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  recurring: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: moment().format("y-MM-DD HH:mm:ss"),
  },
  updatedAt: {
    type: Date,
    default: moment().format("y-MM-DD HH:mm:ss"),
  },
});

module.exports = mongoose.model(
  "conference-room-reservation",
  ConferenceRoomReservationSchema
);
