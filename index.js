require("dotenv").config();
const express = require("express");
const cors = require("cors");
const send = require("./config/response");
// const logger = require("./config/logger");
const router = require("./router")
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;
const PORT = process.env.PORT || 3030;

if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const app = express();
  console.log(`Worker ${process.pid} started`);

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // app.use(logger)

  app.get("/", (req, res) => send(res, 200, "Welcome to API TODO"));
  app.use("/activity-groups", router.activity);
  app.use("/todo-items", router.todo);
  app.use("*", (req, res) => send(res, 404, "End point is not found"));

  app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
}