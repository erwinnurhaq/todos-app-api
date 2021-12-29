const { format } = require("mysql2");
const send = require("../config/response");
const db = require("../config/database");

function ActivityController() {
  this._getActivity = async (id) => {
    try {
      const query = `SELECT * FROM Activity WHERE id = ?;`;
      const [rows] = await db.execute(query, [id]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  };

  this.getAll = async (req, res) => {
    try {
      const { email = "" } = req.query;
      const query = `SELECT * FROM Activity ${email ? "WHERE email = ?" : ""};`;
      const [rows] = await db.execute(query, [email]);
      return send(res, 200, "Success", rows);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.getOne = async (req, res) => {
    try {
      const { id } = req.params;
      const activity = await this._getActivity(id);
      return activity
        ? send(res, 200, "Success", activity)
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
      const query = `INSERT INTO Activity SET ?, created_at=now(), updated_at=now()`;
      const [result] = await db.execute(format(query, { email, title }));
      const activity = await this._getActivity(result.insertId);
      return send(res, 201, "Success", activity);
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
      const query = `UPDATE Activity SET ?, updated_at=now() WHERE id = ?`;
      const [result] = await db.execute(format(query, [{ title }, id]));
      if (result.affectedRows === 0) {
        return send(res, 404, `Activity with ID ${id} Not Found`);
      }
      const activity = await this._getActivity(id);
      return send(res, 200, "Success", activity);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.del = async (req, res) => {
    try {
      const { id } = req.params;
      const query = `DELETE FROM Activity WHERE id = ?`;
      const [result] = await db.execute(query, [id]);
      return result.affectedRows > 0
        ? send(res, 200, "Success")
        : send(res, 404, `Activity with ID ${id} Not Found`);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };
}

module.exports = new ActivityController();
