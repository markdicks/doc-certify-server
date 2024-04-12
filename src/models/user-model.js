const pool = require("../connection/pool");

// interact with the users table in the database and model how you return the data for web consumption
class User {
  async getUsers() {
    const query = "SELECT * FROM users WHERE role_id=3;";
    const { rows } = await pool.query(query);
    return rows;
  }

  async getAdmins() {
    const query = "SELECT * FROM users WHERE role_id=1;";
    const { rows } = await pool.query(query);
    return rows;
  }

  async getCertifiers() {
    const query = "SELECT * FROM users WHERE role_id=2;";
    const { rows } = await pool.query(query);
    return rows;
  }

  async getUser(id) {
    const query = "SELECT * FROM users WHERE user_id = $1;";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async createUser(user) {
    const query =
      "INSERT INTO users (first_name, last_name, username, email, phone, password, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;";
    const { rows } = await pool.query(query, [
      user.first_name,
      user.last_name,
      user.username,
      user.email,
      user.phone,
      user.password,
      user.role_id,
    ]);
    return rows[0];
  }

  async updateUser(id, user) {
    const query =
      "UPDATE users SET username = $1, email = $2, password = $3, phone = $4, first_name = $5, last_name = $6, role_id = $7 WHERE user_id = $8 RETURNING *;";
    const { rows } = await pool.query(query, [
      user.username,
      user.email,
      user.password,
      user.phone,
      user.first_name,
      user.last_name,
      user.role_id,
      id,
    ]);
    return rows[0];
  }

  async deleteUser(id) {
    const query = "DELETE FROM users WHERE user_id = $1;";
    await pool.query(query, [id]);
  }

  async authenticateUser(email, password) {
    const query =
      "SELECT * FROM users WHERE email = $1 OR username = $1 AND password = $2;";
    const { rows } = await pool.query(query, [email, password]);
    return rows[0];
  }
}

module.exports = new User();
