const User = require('../data/User');
const { StatusCodes } = require('http-status-codes');

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
    return res.status(StatusCodes.BAD_REQUEST).json({
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
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'There was a problem updating your bio',
    });
  }
};

module.exports = { getBio, updateBio };
