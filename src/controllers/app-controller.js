const e = require("express");
const appModel = require("../models/app-model");

const getAdminStats = async (req, res) => {
  try {
    const stats = await appModel.getAdminStats();
    stats.forEach((stat) => {
      stat.name = stat.name === "User" ? "Certify-ee" : stat.name;
    });
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAdminStats,
};
