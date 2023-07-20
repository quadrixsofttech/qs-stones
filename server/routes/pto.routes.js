const express = require('express');
const router = express.Router();
const PtoController = require('../controllers/pto.controller');

router.post('/', PtoController.createPaidTimeOff);
router.get('/:type', PtoController.getPaidTimeOff);

module.exports = router;
