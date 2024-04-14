const userModel = require("../models/user-model");

const UNIQUE_CONSTRAINT_ERROR_MESSAGE = {
  email: "Email already exists",
  phone: "Phone number already exists",
};

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
    const newUser = await userModel.createUser(user);
    res.json(newUser);
  } catch (error) {
    const isUniqueViolationError = error.message.includes("unique constraint");
    const key = error.message.includes("email") ? "email" : "phone";
    isUniqueViolationError
      ? res.status(400).json({
          error: {
            [key]: UNIQUE_CONSTRAINT_ERROR_MESSAGE[key],
          },
        })
      : res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.body;
    const updatedUser = await userModel.updateUser(user.id, user);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await userModel.deleteUser(id);
    res.json({ message: "Account deleted" });
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

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticateUser(email, password);
    !user
      ? res.status(404).json({ message: "Invalid username or password" })
      : res.json({ user, authenticated: true });
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
  authenticateUser,
};
