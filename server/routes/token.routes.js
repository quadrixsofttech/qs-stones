const express = require('express');
const router = express.Router();
const { attachUser, csrfProtection } = require('../middleware/protected');

router.get('/', attachUser, csrfProtection, (req, res) => {
  return res.json({ csrfToken: req.csrfToken(), token: req.cookies.token });
});

module.exports = router;
