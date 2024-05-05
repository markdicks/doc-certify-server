const docModel = require("../models/doc-model");
const multer = require("multer");

const getAllDocs = async (req, res) => {
  try {
    const docs = await docModel.getDocs();
    if (!docs) {
      res.status(404).json({ message: "No documents found" });
    }
    res.json({ docs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await docModel.getDoc(id);
    if (!doc) {
      res.status(404).json({ message: "Document not found" });
    }
    res.json({ doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const saveDoc = async (req, res) => {
  console.log("SaveDoc....");
  try {
    const { client_id, name, description } = req.body;
    console.log("req.file", req.files.copy_file[0]);
    const copyFile = req.files.copy_file[0].buffer.toString("base64");
    const originalFile =
      req.files.original_file?.[0]?.buffer.toString("base64");

    console.log("CopyFile", copyFile);
    console.log("OriginalFile", originalFile);
    const newDoc = await docModel.saveDoc({
      client_id,
      name,
      description,
      copy_file: copyFile,
      original_file: copyFile,
    });
    console.log("New Doc", newDoc);
    res.json(newDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDoc = async (req, res) => {
  try {
    const doc = req.body;
    const updatedDoc = await docModel.updateDoc(doc);
    res.json(updatedDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDoc = async (req, res) => {
  try {
    const { id } = req.params;
    await docModel.deleteDoc(id);
    res.json({ message: "Document deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDocs,
  getDoc,
  saveDoc,
  updateDoc,
  deleteDoc,
};
