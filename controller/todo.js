const send = require("../config/response")

module.exports = {
  async getAll(req, res) {
    try {
      return send(res, 200, "Success")
    } catch(err) {
      return send(res, 400, err.message)
    }
  },
  async getOne(req, res) {
    try {
      return send(res, 200, "Success")
    } catch(err) {
      return send(res, 400, err.message)
    }
  },
  async create(req, res) {
    try {
      return send(res, 200, "Success")
    } catch(err) {
      return send(res, 400, err.message)
    }
  },
  async update(req, res) {
    try {
      return send(res, 200, "Success")
    } catch(err) {
      return send(res, 400, err.message)
    }
  },
  async del(req, res) {
    try {
      return send(res, 200, "Success")
    } catch(err) {
      return send(res, 400, err.message)
    }
  }
}