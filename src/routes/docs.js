const express = require("express");
const userController = require("../controllers/doc-controller");
const multer = require("multer");

const router = express.Router();
// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/docs", userController.getAllDocs);
router.post(
  "/doc",
  upload.fields([
    { name: "copy_file", maxCount: 1 },
    { name: "original_file", maxCount: 1 },
  ]),
  userController.saveDoc
);
router.get("/docs/:id", userController.getDoc);
router.delete("/docs/:id", userController.deleteDoc);
router.put("/docs/:id", userController.updateDoc);

module.exports = router;
