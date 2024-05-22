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
/* const storage = multer.diskStorage({
  destination: function (req, files, cb) {
    // Destination based on fieldname
    if (files.fieldname === "original") {
      cb(null, "storage/color");
    }
    if (files.fieldname === "copy") {
      cb(null, "storage/copy");
    } else {
      cb(new Error("Invalid fieldname"));
    }
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname);
  },
}); */

// Middleware to handle multiple files
const upload = multer({ storage: storage });

const filesMiddleware = upload.fields([
  { name: "color", maxCount: 1 },
  { name: "original", maxCount: 1 },
]);

router.post("/doc", filesMiddleware, docController.saveDoc);
router.get("/docs", docController.getDocsByClient);
router.delete("/docs/:id", docController.deleteDoc);
router.put("/docs/:id", docController.updateDoc);

module.exports = router;
