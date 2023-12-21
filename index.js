const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
// const { Server } = require("socket.io");

const config = require("./src/utils/config");
const routes = require("./src/routes");

const server = http.createServer(app);
const io = require("socket.io")(server);

// const io = new Server(server, {
//   cors: {
//     origin: "https://localhost:3000",
//   },
// });
require("./src/controllers/ChatController")(io);

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/api/v1", routes);

console.log("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
