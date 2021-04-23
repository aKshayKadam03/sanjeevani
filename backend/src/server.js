const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./config/db");
const port = process.env.PORT || 8080;

const seekRouter = require("./controllers/seek.controller");
const userRouter = require("./controllers/user.controller");
const hostRouter = require("./controllers/host.controller");

app.use(cors());

app.use(express.json());
app.use("/seek", seekRouter);
app.use("/user", userRouter);
app.use("/host", hostRouter);

async function start() {
  await connect();
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
}

module.exports = start;
