const pool = require("../connection/pool");
const userModel = require("./user-model");

class App {
  async getAdminStats() {
    const admins = await userModel.getAdmins();
    const certifiers = await userModel.getCertifiers();
    const users = await userModel.getUsers();
    const rows = [
      {
        name: "admin",
        user_count: admins?.length,
      },
      {
        name: "certifier",
        user_count: certifiers?.length,
      },
      {
        name: "Certifyee",
        user_count: users?.length,
      },
    ];
    return rows;
  }
}

module.exports = new App();
