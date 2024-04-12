const appModel = require("../models/app-model");

const getAdminStats = async (req, res) => {
  try {
    const stats = await appModel.getAdminStats();
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAdminStats,
};
