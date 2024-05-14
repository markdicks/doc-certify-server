const reportModel = require("../models/report-model");

const usersReport = async (req, res) => {
  try {
    const report = await reportModel.usersReport();
    res.json({ report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  usersReport,
};
