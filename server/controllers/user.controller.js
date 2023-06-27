const User = require('../data/User');
const { StatusCodes } = require('http-status-codes');

const getUser = async (req, res) => {
  try {
    const users = await User.find()
      .lean()
      .select('_id firstName lastName avatar email');

    res.json({
      users,
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'There was a problem getting the users',
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const allowedRoles = ['user', 'admin'];

    if (!allowedRoles.includes(role)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Role not allowed' });
    }
    await User.findOneAndUpdate({ _id: req.user.sub }, { role });
    res.json({
      message: 'User role updated.',
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: err });
  }
};

module.exports = { getUser, updateUserRole };
