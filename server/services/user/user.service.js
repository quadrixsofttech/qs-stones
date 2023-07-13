const User = require('../../models/User');

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

module.exports = { getAllUsers, updateUserRole };
