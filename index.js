require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const send = require("./config/response");
const router = require("./router")
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => send(res, 200, "Welcome to API TODO"));
app.use("/activity-groups", router.activity);
app.use("/todo-items", router.todo);
app.use("*", (req, res) => send(res, 404, "End point is not found"));

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
