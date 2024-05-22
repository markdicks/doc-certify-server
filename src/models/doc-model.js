const pool = require("../connection/pool");

class Doc {
  async getDocs() {
    const query = "SELECT * FROM documents;";
    const { rows } = await pool.query(query);
    return rows;
  }

  async getDoc(id) {
    const query = "SELECT * FROM documents WHERE document_id = $1;";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async getDocsByClient(client_id) {
    const query =
      "SELECT * FROM documents WHERE client_id = $1 ORDER BY upload_date DESC;";
    const { rows } = await pool.query(query, [client_id]);
    return rows;
  }

  async saveDoc(doc) {
    const query =
      "INSERT INTO documents (client_id, document_type) VALUES ($1, $2) RETURNING *;";
    const { rows } = await pool.query(query, [
      doc.client_id,
      doc.document_type,
    ]);
    return rows[0];
  }

  async updateDoc(doc) {
    const query =
      "UPDATE documents SET title = $1, content = $2 WHERE document_id = $3 RETURNING *;";
    const { rows } = await pool.query(query, [
      doc.title,
      doc.content,
      doc.doc_id,
    ]);
    return rows[0];
  }

  async deleteDoc(id) {
    const query = "DELETE FROM documents WHERE document_id = $1;";
    await pool.query(query, [id]);
  }

  async getDocsCertified(client_id) {
    const query =
      "SELECT * FROM documents WHERE client_id = $1 AND status = 'certified';";
    const { rows } = await pool.query(query, [client_id]);
    return rows;
  }

  async getDocsPending(client_id) {
    const query =
      "SELECT * FROM documents WHERE client_id = $1 AND status = 'pending';";
    const { rows } = await pool.query(query, [client_id]);
    return rows;
  }

  async getDocsRejected(client_id) {
    const query =
      "SELECT * FROM documents WHERE client_id = $1 AND status = 'rejected';";
    const { rows } = await pool.query(query, [client_id]);
    return rows;
  }

  async getNumDocsCreatedToday() {
    const query =
      "SELECT COUNT(*) FROM documents WHERE upload_date = CURRENT_DATE;";
    const { rows } = await pool.query(query);
    return rows[0].count;
  }

  async assignCertifier(doc_id, certifier_id) {
    console.log(doc_id, certifier_id);
    const query =
      "UPDATE documents SET certifier_id = $1, status = 'processing' WHERE document_id = $2 RETURNING *;";
    const { rows } = await pool.query(query, [Number(certifier_id), doc_id]);
    return rows[0];
  }
}

module.exports = new Doc();
