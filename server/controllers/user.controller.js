const UserService = require('../services/user/user.service');
const { StatusCodes } = require('http-status-codes');

const getUsers = async (req, res) => {
  try {
    let users = await UserService.getAllUsers();
    return res.send(users);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'There was a problem getting the users',
    });
  }
};

const getAdministrators = async (req, res) => {
  try {
    const user = await UserService.getAdmins();
    res.send(user);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'There was a problem getting administrators',
    });
  }
};

const updateRole = async (req, res) => {
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

module.exports = { getUsers, updateRole, getAdministrators };
