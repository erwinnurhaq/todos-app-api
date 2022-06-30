const send = require("../config/response");
const db = require("../config/database");

module.exports = {
  getAll: async (req, res) => {
    try {
      const {email = ""} = req.query;
      const result = await db.query(`SELECT * FROM activities ${email ? "WHERE email = ?" : ""} LIMIT 5;`, [email]);
      return send(res, 200, "Success", result[0]);
    } catch (err) {
      return send(res, 400, err.message);
    }
  },

  getOne: async (req, res) => {
    try {
      const {id} = req.params;
      const result = await db.query(`SELECT * FROM activities WHERE id = ?;`, [id]);
      return result[0].length > 0
        ? send(res, 200, "Success", result[0][0])
        : send(res, 404, `Activity with ID ${id} Not Found`);
    } catch (err) {
      return send(res, 400, err.message);
    }
  },

  create: async (req, res) => {
    try {
      const {email = "", title} = req.body;
      if (!title) {
        return send(res, 400, "title cannot be null");
      }
      const result = await db.query(`INSERT INTO activities SET ?; SELECT * FROM activities WHERE id = LAST_INSERT_ID();`, {
        email,
        title
      });
      return send(res, 201, "Success", result[0][1][0]);
    } catch (err) {
      return send(res, 400, err.message);
    }
  },

  update: async (req, res) => {
    try {
      const {id} = req.params;
      const {title} = req.body;
      if (!title) {
        return send(res, 400, "title cannot be null");
      }
      const result = await db.query(`UPDATE activities SET ?, updated_at=now() WHERE id = ?; SELECT * FROM activities WHERE id = ?;`, [{title}, id, id]);
      if (result[0][0].affectedRows === 0) {
        return send(res, 404, `Activity with ID ${id} Not Found`);
      }
      return send(res, 200, "Success", result[0][1][0]);
    } catch (err) {
      return send(res, 400, err.message);
    }
  },

  del: async (req, res) => {
    try {
      const {id} = req.params;
      const result = await db.query(`DELETE FROM activities WHERE id = ?`, [id]);
      return result[0].affectedRows > 0
        ? send(res, 200, "Success")
        : send(res, 404, `Activity with ID ${id} Not Found`);
    } catch (err) {
      return send(res, 400, err.message);
    }
  }
}
