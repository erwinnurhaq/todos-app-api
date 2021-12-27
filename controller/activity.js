const { format } = require("mysql2");
const send = require("../config/response");
const db = require("../config/database");

module.exports = {
  async getAll(req, res) {
    try {
      const { email = "" } = req.query;
      const query = `SELECT * FROM Activity ${email ? "WHERE email = ?" : ""};`;
      const [rows] = await db.execute(query, [email]);
      return send(res, 200, "Success", rows);
    } catch (err) {
      return send(res, 400, err.message);
    }
  },

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const query = `SELECT * FROM Activity WHERE id = ?;`;
      const [rows] = await db.execute(query, [id]);
      if (rows.length === 0) {
        return send(res, 404, `Activity with ID ${id} Not Found`);
      }
      return send(res, 200, "Success", rows[0]);
    } catch (err) {
      return send(res, 400, err.message);
    }
  },

  async create(req, res) {
    try {
      const { email = "", title } = req.body;
      if (!title) {
        return send(res, 400, "title cannot be null");
      }
      let query = `INSERT INTO Activity SET ?, created_at=now(), updated_at=now()`;
      const [result] = await db.execute(format(query, { email, title }));
      query = `SELECT * FROM Activity WHERE id = ?;`;
      const [rows] = await db.execute(query, [result.insertId]);
      return send(res, 200, "Success", rows[0]);
    } catch (err) {
      return send(res, 400, err.message);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      if (!title) {
        return send(res, 400, "title cannot be null");
      }
      let query = `UPDATE Activity SET ?, updated_at=now() WHERE id = ?`;
      const [result] = await db.execute(format(query, [{ title }, id]));
      if (result.affectedRows === 0) {
        return send(res, 404, `Activity with ID ${id} Not Found`);
      }
      query = `SELECT * FROM Activity WHERE id = ?;`;
      const [rows] = await db.execute(query, [id]);
      return send(res, 200, "Success", rows[0]);
    } catch (err) {
      return send(res, 400, err.message);
    }
  },

  async del(req, res) {
    try {
      const { id } = req.params;
      const query = `DELETE FROM Activity WHERE id = ?`;
      const [result] = await db.execute(query, [id]);
      if (result.affectedRows === 0) {
        return send(res, 404, `Activity with ID ${id} Not Found`);
      }
      return send(res, 200, "Success");
    } catch (err) {
      return send(res, 400, err.message);
    }
  },
};
