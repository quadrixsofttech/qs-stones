const express = require("express");
const requireAdmin = require("../middleware/admin");

const AzureController = require("../controllers/azure.controller");

const router = express.Router();

router.post("/create-event", AzureController.createEvent);

module.exports = router;
