const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const rootRouter = require("./root");
const appRouter = require("./app");

router.use("/", userRouter);
router.use("/", rootRouter);
rootRouter.use("/", appRouter);

module.exports = router;
