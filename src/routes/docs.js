const express = require("express");
const docController = require("../controllers/doc-controller");
const docModel = require("../models/doc-model");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const middleware = upload.fields([
  { name: "copy", maxCount: 1 },
  { name: "original", maxCount: 1 },
]);

router.post("/doc/upload", middleware, async (req, res) => {
  try {
    const { client_id, document_type } = req.body;
    const newDoc = await docModel.saveDoc({
      client_id,
      document_type,
    });
    res.json(newDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/docs", docController.getDocsByClient);
router.put("/doc/assign", docController.assignCertifier);
router.get("/jobs", docController.getAllDocs);
router.delete("/doc/:id", docController.deleteDoc);
router.put("/docs/:id", docController.updateDoc);

module.exports = router;
