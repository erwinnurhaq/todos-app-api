const send = require("../config/response");
const db = require("../config/database");

function ActivityController() {
  this.getAll = async (req, res) => {
    try {
      const { email = "" } = req.query;
      const rows = await db(`SELECT * FROM activities ${email ? "WHERE email = ?" : ""} LIMIT 5;`, [email]);
      return send(res, 200, "Success", rows);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.getOne = async (req, res) => {
    try {
      const { id } = req.params;
      const rows = await db(`SELECT * FROM activities WHERE id = ?;`, [id]);
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
      const result = await db(`INSERT INTO activities SET ?; SELECT * FROM activities WHERE id = LAST_INSERT_ID();`, { email, title });
      console.log(result)
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
      const result = await db(`UPDATE activities SET ?, updated_at=now() WHERE id = ?; SELECT * FROM activities WHERE id = ?;`, [{ title }, id, id]);
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
      const result = await db(`DELETE FROM activities WHERE id = ?`, [id]);
      return result.affectedRows > 0
        ? send(res, 200, "Success")
        : send(res, 404, `Activity with ID ${id} Not Found`);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };
}

module.exports = new ActivityController();
