const userModel = require("../models/user-model");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    if (!users) {
      res.status(404).json({ message: "No users found" });
    }
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("ID:", id);
    const user = await userModel.getUser(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = req.body;
    console.log("User:", user);
    const newUser = await userModel.createUser(user);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const updatedUser = await userModel.updateUser(id, user);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await userModel.deleteUser(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await userModel.getAdmins();
    if (!admins) {
      res.status(404).json({ message: "No admins found" });
    }
    res.json({ admins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCertifiers = async (req, res) => {
  try {
    const certifiers = await userModel.getCertifiers();
    if (!certifiers) {
      res.status(404).json({ message: "No certifiers found" });
    }
    res.json({ certifiers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAdmins,
  getCertifiers,
};
