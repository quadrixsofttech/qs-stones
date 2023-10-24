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

const getEmployees = async (req, res) => {
  try {
    const employees = await UserService.getEmployees();
    res.send(employees);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'There was a problem getting employees',
    });
  }
};

const getVacations = async (req, res) => {
  try {
    const { id } = req.params;
    const vacations = await UserService.getUserVacation(id);
    res.send(vacations);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'There was a problem getting vacations',
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

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await UserService.removeEmployee(id);
    res.send(employee);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'There was a problem deleting employee',
    });
  }
};

module.exports = {
  getUsers,
  updateRole,
  getAdministrators,
  getVacations,
  getEmployees,
  deleteEmployee,
};
