function getStatus(code) {
  switch (code) {
    case 200:
      return "Success";
    case 400:
      return "Bad Request";
    case 404:
      return "Not Found";
    default:
      return "Internal Error";
  }
}

function send(res, code, message = "success", data = null) {
  return res.status(code).send({
    status: getStatus(code),
    message,
    data
  });
}

module.exports = send;
