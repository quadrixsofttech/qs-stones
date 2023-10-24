const express = require('express');
const { requireAuth } = require('../middleware/user');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.get('/users', requireAuth, UserController.getUsers);
router.delete('/employees', UserController.deleteEmployee);
router.get('/employees', UserController.getEmployees);
router.get('/admins', UserController.getAdministrators);
router.get('/vacations/:id', UserController.getVacations);
router.patch('/user-role', UserController.updateRole);

module.exports = router;
