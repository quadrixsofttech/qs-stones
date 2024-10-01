const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const PtoSchema = new Schema({
  type: {
    type: String,
    enum: [
      "vacation",
      "remote",
      "unpaid time off",
      "paid time off",
      "sick leave",
    ],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  paidLeaveType: {
    type: String,
    enum: [
      "Leave for Birth of a child",
      "Marriage leave",
      "Leave for the death of a close family member",
      "Leave for the hard illness of a close family member",
    ],
  },
  reviewerId: {
    type: Schema.Types.ObjectId,
    ref: "user",
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
    default: moment().format("y-MM-DD HH:mm:ss"),
  },
  updatedAt: {
    type: Date,
    default: moment().format("y-MM-DD HH:mm:ss"),
  },
});

module.exports = mongoose.model("pto", PtoSchema);
