const User = require('../data/User');

const getBio = async (req, res) => {
  try {
    const { sub } = req.user;
    const user = await User.findOne({
      _id: sub,
    })
      .lean()
      .select('bio');

    res.json({
      bio: user.bio,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was a problem updating your bio',
    });
  }
};

const updateBio = async (req, res) => {
  try {
    const { sub } = req.user;
    const { bio } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: sub,
      },
      {
        bio,
      },
      {
        new: true,
      }
    );

    res.json({
      message: 'Bio updated!',
      bio: updatedUser.bio,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was a problem updating your bio',
    });
  }
};

const getUser = async (req, res) => {
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
};

const updateRole = async (req, res) => {
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
};

module.exports = {
  getBio,
  updateBio,
  getUser,
  updateRole,
};
