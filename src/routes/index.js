const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const rootRouter = require("./root");
const appRouter = require("./app");
const docRouter = require("./docs");

router.use("/", userRouter);
router.use("/", rootRouter);
router.use("/", docRouter);
rootRouter.use("/", appRouter);


module.exports = router;
