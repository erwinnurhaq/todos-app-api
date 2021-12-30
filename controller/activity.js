const send = require("../config/response");
const db = require("../config/database");

function ActivityController() {
  this.getAll = async (req, res) => {
    try {
      const { email = "" } = req.query;
      const query = `SELECT * FROM activities ${email ? "WHERE email = ?" : ""} LIMIT 5;`;
      const [rows] = await db.query(query, [email]);
      return send(res, 200, "Success", rows);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.getOne = async (req, res) => {
    try {
      const { id } = req.params;
      const query = `SELECT * FROM activities WHERE id = ?;`;
      const [rows] = await db.query(query, [id]);
      return rows.length > 0
        ? send(res, 200, "Success", rows[0])
        : send(res, 404, `Activity with ID ${id} Not Found`);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.create = async (req, res) => {
    try {
      const { email = "", title } = req.body;
      if (!title) {
        return send(res, 400, "title cannot be null");
      }
      const query = `INSERT INTO activities SET ?; SELECT * FROM activities WHERE id = LAST_INSERT_ID();`;
      const [result] = await db.query(query, { email, title });
      return send(res, 201, "Success", result[1][0]);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.update = async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      if (!title) {
        return send(res, 400, "title cannot be null");
      }
      const query = `UPDATE activities SET ?, updated_at=now() WHERE id = ?; SELECT * FROM activities WHERE id = ?;`;
      const [result] = await db.query(query, [{ title }, id, id]);
      if (result[0].affectedRows === 0) {
        return send(res, 404, `Activity with ID ${id} Not Found`);
      }
      return send(res, 200, "Success", result[1][0]);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.del = async (req, res) => {
    try {
      const { id } = req.params;
      const query = `DELETE FROM activities WHERE id = ?`;
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0
        ? send(res, 200, "Success")
        : send(res, 404, `Activity with ID ${id} Not Found`);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };
}

module.exports = new ActivityController();
