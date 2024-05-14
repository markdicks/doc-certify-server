const express = require("express");
const reportController = require("../controllers/report-controller");

const router = express.Router();
router.get("/report/users", reportController.usersReport);

module.exports = router;
