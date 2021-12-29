const send = require("../config/response");
const Activity = require("../models/activity");
const Todo = require("../models/todo");

function TodoController() {
  this.getAll = async (req, res) => {
    try {
      const { activity_group_id } = req.query;
      const options = activity_group_id ? { where: { activity_group_id } } : {};
      const data = await Todo.findAll(options);
      return send(res, 200, "Success", data);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.getOne = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Todo.findByPk(id);
      return data
        ? send(res, 200, "Success", data)
        : send(res, 404, `Todo with ID ${id} Not Found`);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.create = async (req, res) => {
    try {
      const {
        title,
        activity_group_id,
        priority = "very-high",
        is_active = "1",
      } = req.body;

      if (!title) {
        return send(res, 400, "title cannot be null");
      }
      if (!activity_group_id) {
        return send(res, 400, "activity_group_id cannot be null");
      }

      // const isExist = await Activity.findByPk(activity_group_id);
      // if (!isExist) {
      //   return send(
      //     res,
      //     404,
      //     `Activity with activity_group_id ${activity_group_id} Not Found`
      //   );
      // }

      const data = await Todo.create({
        activity_group_id,
        title,
        priority,
        is_active,
      });
      data.is_active = true;
      return send(res, 201, "Success", data);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.update = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, is_active, priority } = req.body;
      if (title?.length === 0) {
        return send(res, 400, "title cannot be empty");
      }

      const data = await Todo.findByPk(id);
      if (!data) {
        return send(res, 404, `Todo with ID ${id} Not Found`);
      }
      data.title = title || data.title;
      data.is_active =
        is_active !== undefined ? String(Number(is_active)) : data.is_active;
      data.priority = priority || data.priority;
      data.updated_at = Date.now();

      await Todo.update(data.dataValues, { where: { id } });
      return send(res, 200, "Success", data);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.del = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Todo.findByPk(id);
      if (!data) {
        return send(res, 404, `Todo with ID ${id} Not Found`);
      }
      await Todo.destroy({ where: { id } });
      return send(res, 200, "Success");
    } catch (err) {
      return send(res, 400, err.message);
    }
  };
}

module.exports = new TodoController();
