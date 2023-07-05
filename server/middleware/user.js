const jwt = require('express-jwt');
const jwtDecode = require('jwt-decode');

const attachUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Authentication invalid' });
  }
  const decodedToken = jwtDecode(token);

  if (!decodedToken) {
    return res.status(401).json({
      message: 'There was a problem authorizing the request',
    });
  } else {
    req.user = decodedToken;
    next();
  }
};

const requireAuth = jwt({
  secret: process.env.JWT_SECRET,
  audience: 'api.orbit',
  issuer: 'api.orbit',
  getToken: (req) => req.cookies.token,
});

module.exports = { attachUser, requireAuth };
