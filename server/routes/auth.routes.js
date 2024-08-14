const express = require("express");
const router = express.Router();

const requireAdmin = require("../middleware/admin");

const AuthController = require("../controllers/auth.controller");
const AzureController = require("../controllers/azure.controller");

router.post("/authenticate", AuthController.authenticate);

router.post("/signup", AuthController.signUp);

router.post("/create-event", AzureController.createEvent);

module.exports = router;
