const express = require("express");
const { requireAuth } = require("../middleware/user");
const UserController = require("../controllers/user.controller");
const AzureController = require("../controllers/azure.controller");

const router = express.Router();

router.get("/users", requireAuth, UserController.getUsers);
router.get("/novelic-user", requireAuth, UserController.getNovelicUser);
router.get("/employees", UserController.getEmployees);
router.delete("/employees/:id", UserController.deleteEmployee);
router.get("/admins", UserController.getAdministrators);
router.get("/vacations/:id", UserController.getVacations);
router.patch("/user-role", UserController.updateRole);
router.patch("/change-password", UserController.changePassword);
router.get("/holidays", UserController.getHolidays);
router.get("/get-office-user", AzureController.getOfficeUser);
router.post("/create-event", AzureController.createEvent);

module.exports = router;
