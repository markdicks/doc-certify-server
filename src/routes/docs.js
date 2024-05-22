const express = require("express");
const docController = require("../controllers/doc-controller");
const multer = require("multer");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Middleware to handle multiple files
const upload = multer({ storage: storage });

const filesMiddleware = () =>
  upload.fields([
    { name: "color", maxCount: 1 },
    { name: "original", maxCount: 1 },
  ]);

router.post("/doc", filesMiddleware, docController.saveDoc);
router.get("/docs", docController.getDocsByClient);
router.delete("/doc/:id", docController.deleteDoc);
router.put("/docs/:id", docController.updateDoc);

module.exports = router;
