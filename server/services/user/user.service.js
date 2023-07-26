const User = require('../../models/user.model');
const moment = require('moment');


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

async function getTotalUsersWorkingToday() {
  const currentDate = moment().format('YYYY/MM/DD');
  const activeUsers = await User.find({ active: true, days: currentDate });
  return activeUsers.length;
}
4;

module.exports = {
  getAllUsers,
  updateUserRole,
  getAdmins,
  getTotalUsersWorkingToday,
};
