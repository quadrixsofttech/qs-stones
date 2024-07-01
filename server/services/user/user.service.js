const User = require('../../models/user.model');
const PaidTimeOff = require('../../models/pto.model');
const ConferenceRoomReservation = require('../../models/conference-room-reservation');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const holidays = require('../../utils/utils.js');

const getAllUsers = async () => {
  try {
    const users = await User.find()
      .lean()
      .select('_id firstName lastName avatar email');
    return users;
  } catch (err) {
    throw new Error(err);
  }
};

const getAdmins = async () => {
  try {
    const admins = await User.find({ role: 'admin' })
      .select('_id firstName lastName')
      .lean();
    return admins;
  } catch (err) {
    throw new Error(err);
  }
};

const getEmployees = async () => {
  try {
    const employees = await User.find()
      .select('_id firstName lastName avatar email image')
      .lean();

    const employeeWithPendingRequests = await Promise.all(
      employees.map(async (employee) => {
        const pendingRequests = await PaidTimeOff.find({
          status: 'pending',
          userId: employee._id,
        });
        return {
          ...employee,
          pendingRequests,
        };
      })
    );

    return employeeWithPendingRequests;
  } catch (err) {
    throw new Error(err);
  }
};
const getUserVacation = async (id) => {
  try {
    const vacation = await User.findOne({ _id: id }).select('vacation').lean();
    return vacation;
  } catch (err) {
    throw new Error(err);
  }
};
const updateUserRole = async (role, userId) => {
  try {
    const allowedRoles = ['user', 'admin'];
    if (!allowedRoles.includes(role)) {
      throw new Error('Role not allowed');
    }
    await User.findOneAndUpdate({ _id: userId }, { role });
    return {
      message: 'User role updated',
    };
  } catch (err) {
    throw new Error(err);
  }
};

const removeEmployee = async (id) => {
  try {
    const employee = await User.deleteOne({ _id: id });
    await PaidTimeOff.deleteMany({ userId: id });
    await ConferenceRoomReservation.deleteMany({ userId: id });
    return employee;
  } catch (err) {
    throw new Error(err);
  }
};

async function getTotalUsersWorkingToday() {
  const currentDate = moment().format('YYYY/MM/DD');
  const activeUsers = await User.find({ active: true, days: currentDate });
  return activeUsers.length;
}

const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error('Incorrect old password');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return {
      message: 'Password changed successfully',
    };
  } catch (error) {
    throw new Error(error.message || 'Error in changing passsword');
  }
};

const getHolidays = async () => {
  try {
    return holidays;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  getAdmins,
  getUserVacation,
  getTotalUsersWorkingToday,
  getEmployees,
  removeEmployee,
  changePassword,
  getHolidays,
};
