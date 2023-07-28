const User = require('../models/user.model');
const jwtDecode = require('jwt-decode');
const { StatusCodes } = require('http-status-codes');

const { createToken, hashPassword, verifyPassword } = require('../util');

const authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    }).lean();

    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'Wrong email or password.',
      });
    }

    const passwordValid = await verifyPassword(password, user.password);

    if (passwordValid) {
      const { password, bio, ...rest } = user;
      const userInfo = Object.assign({}, { ...rest });

      const token = createToken(userInfo);

      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      res.cookie('token', token, { httpOnly: true });

      res.json({
        message: 'Authentication successful!',
        token,
        userInfo,
        expiresAt,
      });
    } else {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'Wrong email or password.',
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Something went wrong.' });
  }
};

const signUp = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;

    const hashedPassword = await hashPassword(req.body.password);

    const userData = {
      email: email.toLowerCase(),
      firstName,
      lastName,
      password: hashedPassword,
      role: 'admin',
      vacation: [{}],
    };

    const existingEmail = await User.findOne({
      email: userData.email,
    }).lean();

    if (existingEmail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Email already exists' });
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      const token = createToken(savedUser);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      const { _id, firstName, lastName, email, role, vacation } = savedUser;

      const userInfo = {
        _id,
        firstName,
        lastName,
        email,
        role,
        vacation,
      };

      res.cookie('token', token, { httpOnly: true });

      return res.json({
        message: 'User created!',
        token,
        userInfo,
        expiresAt,
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'There was a problem creating your account',
      });
    }
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'There was a problem creating your account',
    });
  }
};

module.exports = {
  authenticate,
  signUp,
};
