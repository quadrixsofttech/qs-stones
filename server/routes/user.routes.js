const express = require('express');
const router = express.Router();

const User = require('../data/User');
const { requireAuth } = require('../middleware/user');

router.get('/users', requireAuth, async (req, res) => {
  try {
    const users = await User.find()
      .lean()
      .select('_id firstName lastName avatar email');

    res.json({
      users,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was a problem getting the users',
    });
  }
});

router.patch('/user-role', async (req, res) => {
  try {
    const { role } = req.body;
    const allowedRoles = ['user', 'admin'];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Role not allowed' });
    }
    await User.findOneAndUpdate({ _id: req.user.sub }, { role });
    res.json({
      message: 'User role updated.',
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

module.exports = router;
