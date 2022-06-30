const send = require("../config/response");
const db = require("../config/database");

module.exports = {
  getAll: async (req, res) => {
    try {
      const {activity_group_id} = req.query;
      const result = await db.query(`SELECT * FROM todos ${activity_group_id ? "WHERE activity_group_id = ?" : ""} LIMIT 5;`, [activity_group_id]);
      return send(res, 200, "Success", result[0]);
    } catch (err) {
      return send(res, 400, err.message);
    }
  },

  getOne: async (req, res) => {
    try {
      const {id} = req.params;
      const result = await db.query(`SELECT * FROM todos WHERE id = ?;`, [id]);
      return result[0].length > 0
        ? send(res, 200, "Success", result[0][0])
        : send(res, 404, `Todo with ID ${id} Not Found`);
    } catch (err) {
      return send(res, 400, err.message);
    }
  },

  create: async (req, res) => {
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
      const result = await db.query(`INSERT INTO todos SET ?; SELECT * FROM todos WHERE id = LAST_INSERT_ID();`, data);
      return send(res, 201, "Success", {
        ...result[0][1][0],
        is_active: true,
        activity_group_id: Number(req.body.activity_group_id),
      });
    } catch (err) {
      return send(res, 400, err.message);
    }
  },

  update: async (req, res) => {
    try {
      const {id} = req.params;
      if (req.body.title?.length === 0) {
        return send(res, 400, "title cannot be empty");
      }
      const data = {...req.body};
      if (typeof req.body.is_active === "boolean") {
        data.is_active = String(Number(req.body.is_active))
      }

      const result = await db.query(`UPDATE todos SET ?, updated_at=now() WHERE id = ?; SELECT * FROM todos WHERE id = ?;`, [data, id, id]);
      if (result[0][0].affectedRows === 0) {
        return send(res, 404, `Todo with ID ${id} Not Found`);
      }
      return send(res, 200, "Success", result[0][1][0]);
    } catch (err) {
      return send(res, 400, err.message);
    }
  },

  del: async (req, res) => {
    try {
      const {id} = req.params;
      const result = await db.query(`DELETE FROM todos WHERE id = ?`, [id]);
      return result[0].affectedRows > 0
        ? send(res, 200, "Success")
        : send(res, 404, `Todo with ID ${id} Not Found`);
    } catch (err) {
      return send(res, 400, err.message);
    }
  }
}
