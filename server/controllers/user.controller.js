const UserService = require('../services/user/user.service');
const { StatusCodes } = require('http-status-codes');
const { createToken, verifyPassword } = require('../util');
const jwtDecode = require('jwt-decode');
const User = require('../models/user.model');

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

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, id } = req.body;

    if (!id || !oldPassword || !newPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Missing required fields',
      });
    }

    const user = await User.findById(id).lean();
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    const passwordValid = await verifyPassword(oldPassword, user.password);
    if (!passwordValid) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'Old password is incorrect',
      });
    }

    const passwordChange = await UserService.changePassword(
      id,
      oldPassword,
      newPassword
    );

    if (passwordChange) {
      const { password, bio, ...rest } = user;
      const userInfo = Object.assign({}, { ...rest });

      const token = createToken(userInfo);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      res.cookie('token', token, { httpOnly: true });

      return res.status(StatusCodes.OK).json({
        message: 'Password changed successfully!',
        token,
        userInfo,
        expiresAt,
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to change the password',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'There was a problem changing the password',
    });
  }
};
const getHolidays = async(req,res) => {
  try {
    const holidays = await UserService.getHolidays();
    res.send(holidays);
  }
  catch(err)
  {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err.message });
  }
}

module.exports = {
  getUsers,
  updateRole,
  getAdministrators,
  getVacations,
  getEmployees,
  deleteEmployee,
  changePassword,
  getHolidays
};
