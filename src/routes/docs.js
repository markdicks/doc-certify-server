const express = require("express");
const docController = require("../controllers/doc-controller");
const multer = require("multer");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
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
});

// Middleware to handle multiple files
const upload = multer({ storage: storage });

const filesMiddleware = upload.fields([{ name: "original" }, { name: "copy" }]);

router.get("/docs", docController.getAllDocs);
router.post("/doc", filesMiddleware, docController.saveDoc);
router.get("/docs/:id", docController.getDoc);
router.delete("/docs/:id", docController.deleteDoc);
router.put("/docs/:id", docController.updateDoc);

module.exports = router;
