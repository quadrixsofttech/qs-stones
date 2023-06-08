const requireAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(401).json({ message: 'Insufficient role' });
  }
  next();
};

module.exports = requireAdmin;
