const appController = require("../controllers/app-controller");
const express = require("express");
const router = express.Router();

router.get("/app/admin", appController.getAdminStats);

module.exports = router;
