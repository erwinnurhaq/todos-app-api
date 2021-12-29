const { format } = require("mysql2");
const send = require("../config/response");
const db = require("../config/database");

function TodoController() {
  this._getTodo = async (id) => {
    try {
      const query = `SELECT * FROM Todo WHERE id = ?;`;
      const [rows] = await db.execute(query, [id]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  };

  this.getAll = async (req, res) => {
    try {
      const { activity_group_id = "" } = req.query;
      const query = `SELECT * FROM Todo ${
        activity_group_id ? "WHERE activity_group_id = ?" : ""
      };`;
      const [rows] = await db.execute(query, [activity_group_id]);
      return send(res, 200, "Success", rows);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.getOne = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await this._getTodo(id);
      return todo
        ? send(res, 200, "Success", todo)
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
        is_active: req.body.is_active || "1",
        priority: req.body.priority || "very-high",
      };
      const query = `INSERT INTO Todo SET ?, created_at=now(), updated_at=now()`;
      const [result] = await db.execute(format(query, data));
      const todo = await this._getTodo(result.insertId);
      return send(res, 201, "Success", {
        ...todo,
        is_active: Boolean(Number(todo.is_active)),
        activity_group_id: Number(todo.activity_group_id),
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
        data.is_active = Number(req.body.is_active).toString();
      }

      const query = `UPDATE Todo SET ?, updated_at=now() WHERE id = ?`;
      const [result] = await db.execute(format(query, [data, id]));
      if (result.affectedRows === 0) {
        return send(res, 404, `Todo with ID ${id} Not Found`);
      }
      const todo = await this._getTodo(id);
      return send(res, 200, "Success", todo);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.del = async (req, res) => {
    try {
      const { id } = req.params;
      const query = `DELETE FROM Todo WHERE id = ?`;
      const [result] = await db.execute(query, [id]);
      return result.affectedRows > 0
        ? send(res, 200, "Success")
        : send(res, 404, `Todo with ID ${id} Not Found`);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };
}

module.exports = new TodoController();
