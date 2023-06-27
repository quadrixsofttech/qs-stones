const express = require('express');
const router = express.Router();
const PtoController = require('../controllers/pto.controller');

router.get('/', PtoController.getPaidTimeOffHistory);

module.exports = router;
