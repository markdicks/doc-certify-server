const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/users", userController.getAllUsers);
router.post("/user", userController.createUser);
router.get("/users/:id", userController.getUser);
router.put("/users/:id", userController.updateUser);
router.get("/admins", userController.getAdmins);
router.get("/certifiers", userController.getCertifiers);
router.delete("/users/:id", userController.deleteUser);
router.post("/login", userController.authenticateUser);
router.post("/register", userController.createUser);

module.exports = router;
