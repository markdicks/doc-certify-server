const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const rootRouter = require("./root");

router.use("/", userRouter);
router.use("/", rootRouter);

module.exports = router;
