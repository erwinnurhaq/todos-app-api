const status = {
  200: "Success",
  201: "Success",
  400: "Bad Request",
  404: "Not Found",
}

function send(res, code, message = "Success", data = {}) {
  return res.status(code).send({
    status: status[code] || "Internal Error",
    message,
    data
  });
}

module.exports = send;
