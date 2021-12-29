const send = require("../config/response");
const db = require("../config/database");

function TodoController() {
  this.getAll = async (req, res) => {
    try {
      const { activity_group_id } = req.query;
      const query = `SELECT * FROM Todo ${
        activity_group_id ? "WHERE activity_group_id = ?" : ""
      };`;
      const [rows] = await db.query(query, [activity_group_id]);
      return send(res, 200, "Success", rows);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.getOne = async (req, res) => {
    try {
      const { id } = req.params;
      const query = `SELECT * FROM Todo WHERE id = ?;`;
      const [rows] = await db.query(query, [id]);
      return rows.length > 0
        ? send(res, 200, "Success", rows[0])
        : send(res, 404, `Todo with ID ${id} Not Found`);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.create = async (req, res) => {
    try {
      if (!req.body.title) {
        return send(res, 400, "title cannot be null");
      }
      if (!req.body.activity_group_id) {
        return send(res, 400, "activity_group_id cannot be null");
      }
      const data = {
        activity_group_id: req.body.activity_group_id,
        title: req.body.title,
        priority: req.body.priority || "very-high",
        is_active: "1",
      };
      const query = `INSERT INTO Todo SET ?; SELECT * FROM Todo WHERE id = LAST_INSERT_ID();`;
      const [result] = await db.query(query, data);
      return send(res, 201, "Success", {
        ...result[1][0],
        is_active: true,
        activity_group_id: Number(req.body.activity_group_id),
      });
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.update = async (req, res) => {
    try {
      const { id } = req.params;
      if (req.body.title?.length === 0) {
        return send(res, 400, "title cannot be empty");
      }
      const data = { ...req.body };
      if (typeof req.body.is_active === "boolean") {
        data.is_active = String(Number(req.body.is_active))
      }

      const query = `UPDATE Todo SET ?, updated_at=now() WHERE id = ?; SELECT * FROM Todo WHERE id = ?;`;
      const [result] = await db.query(query, [data, id, id]);
      if (result[0].affectedRows === 0) {
        return send(res, 404, `Todo with ID ${id} Not Found`);
      }
      return send(res, 200, "Success", result[1][0]);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.del = async (req, res) => {
    try {
      const { id } = req.params;
      const query = `DELETE FROM Todo WHERE id = ?`;
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0
        ? send(res, 200, "Success")
        : send(res, 404, `Todo with ID ${id} Not Found`);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };
}

module.exports = new TodoController();
