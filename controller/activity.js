const send = require("../config/response");
const Activity = require("../models/activity");

function ActivityController() {
  this.getAll = async (req, res) => {
    try {
      const { email } = req.query;
      const options = email ? { where: { email } } : {};
      const data = await Activity.findAll(options);
      return send(res, 200, "Success", data);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.getOne = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Activity.findByPk(id);
      return data
        ? send(res, 200, "Success", data)
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
      const data = await Activity.create({ email, title });
      return send(res, 201, "Success", data);
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
      const data = await Activity.findByPk(id);
      if (!data) {
        return send(res, 404, `Activity with ID ${id} Not Found`);
      }
      data.title = title;
      data.updated_at = Date.now();
      await Activity.update(data.dataValues, { where: { id } });
      return send(res, 200, "Success", data);
    } catch (err) {
      return send(res, 400, err.message);
    }
  };

  this.del = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Activity.findByPk(id);
      if (!data) {
        return send(res, 404, `Activity with ID ${id} Not Found`);
      }
      await Activity.destroy({ where: { id } });
      return send(res, 200, "Success");
    } catch (err) {
      return send(res, 400, err.message);
    }
  };
}

module.exports = new ActivityController();
