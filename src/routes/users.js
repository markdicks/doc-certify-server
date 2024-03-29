const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);
router.get("/users/:id", userController.getUser);
router.put("/users/:id", userController.updateUser);
router.get("/admins", userController.getAdmins);
router.get("/certifiers", userController.getCertifiers);
router.delete("/:id", userController.deleteUser);

module.exports = router;
