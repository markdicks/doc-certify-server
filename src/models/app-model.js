const pool = require("../connection/pool");

class App {
  async getAdminStats() {
    const query =
      "SELECT r.name, COUNT(u.*) as user_count FROM users u INNER JOIN roles r ON u.role_id = r.role_id GROUP BY r.name;";
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = new App();
