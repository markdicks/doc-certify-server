const pool = require("../connection/pool");
const userModel = require("./user-model");
const docModel = require("./doc-model");

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

  async getCertifierStats() {
    const certifiers = await userModel.getCertifiers();
    const users = await userModel.getUsers();
    const rows = [
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

  async getUserStats(id) {
    const docs = await docModel.getDocsByClient(id);
    const rejectedDocs = docs.filter((doc) => doc.status === "rejected");
    const certifiedDocs = docs.filter((doc) => doc.status === "certified");
    const rows = [
      {
        name: "Documents",
        doc_count: docs?.length,
        description: "Uploaded documents",
      },
      {
        name: "Action Needed",
        doc_count: rejectedDocs?.length,
        description: "Documents that need attention",
      },
      {
        name: "Certified Documents",
        doc_count: certifiedDocs?.length,
        description: "Documents that have been certified",
      },
    ];
    return rows;
  }
}

module.exports = new App();
