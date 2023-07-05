const UserService = require('../services/user/user.service');

const getUsers = async (req, res) => {
  try {
    let users = await UserService.getAllUsers();
    return res.send(users);
  } catch (err) {
    return res.status(400).json({
      message: 'There was a problem getting the users',
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { role, userId } = req.body;
    let userRole = await UserService.updateUserRole(role, userId);
    return res.send(userRole);
  } catch (err) {
    return res.status(400).json({
      message: 'There was a problem getting the users',
    });
  }
};

module.exports = { getUsers, updateRole };
