function logger(req, res, next) {
  const info = `${Date.now()} - WORKER #${process.pid}: ${req.method} ${
    req.originalUrl
  }`;
  console.time(info);
  res.on("finish", () => {
    console.timeEnd(info);
  });
  next();
}

module.exports = logger;
