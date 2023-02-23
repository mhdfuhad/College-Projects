const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const socket = require("socket.io");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

// Setup
require("./utils/Authorization");
dotenv.config();
const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors());

// Variables
const HTTP_PORT = process.env.PORT || 8081;
const uri = process.env.MONGODB_URI;
const expirationTimeInSeconds = 7200;
const role = RtcRole.PUBLISHER;
const whitelist = [
  "https://sub-merge-application.vercel.app",
  "https://sub-merge-application-git-master-mhdfuhad.vercel.app",
  "http://localhost:3000",
];

const generateRtcToken = function (req, resp) {
  var currentTimestamp = Math.floor(Date.now() / 1000);
  var privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  var channelName = req.query.channelName;
  var uid = req.query.uid || 0;
  if (!channelName) {
    return resp.status(400).json({ error: "channel name is required" }).send();
  }

  var key = RtcTokenBuilder.buildTokenWithUid(
    process.env.APP_ID,
    process.env.APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  resp.header("Access-Control-Allow-Origin", "*");
  return resp.json({ key: key });
};

// Controllers
app.use("/api/user", require("./controllers/userController")); // User account routes
app.use(
  "/api/subscription",
  passport.authenticate("jwt", { session: false }),
  require("./controllers/subscriptionController")
);
app.use(
  "/api/entertainment",
  passport.authenticate("jwt", { session: false }),
  require("./controllers/entertainmentController")
);
app.use(
  "/api/communication",
  passport.authenticate("jwt", { session: false }),
  require("./controllers/communicationsController")
);

app.get(
  "/api/rtcToken",
  passport.authenticate("jwt", { session: false }),
  generateRtcToken
);

app.get("/", function (req, res) {
  res.send({ status: "API is running!" });
});

// 404 middleware to handle any requests for resources that can't be found
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    error: {
      message: "not found",
      code: 404,
    },
  });
});

// error-handling middleware to deal with anything else
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "unable to process request";

  res.status(status).json({
    status: "error",
    error: {
      message,
      code: status,
    },
  });
});

// Starting the server and connection to the database
mongoose
  .connect(uri)
  .then(() => {
    const server = app.listen(HTTP_PORT, () => {
      console.log("App listening on port " + HTTP_PORT);
    });
    console.log("Connected to the database");

    const io = socket(server, {
      cors: {
        origin: function (origin, callback) {
          if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
      },
    });

    let users = [];

    const addUser = (userId, socketId) => {
      !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
    };

    const removeUser = (socketId) => {
      users = users.filter((user) => user.socketId !== socketId);
    };

    const getUser = (userId) => {
      return users.find((user) => user.userId === userId);
    };

    io.on("connection", (socket) => {
      global.chatSocket = socket;
      socket.on("add-user", (userId) => {
        addUser(userId, socket.id);
        socket.emit("users-list", users);
      });

      socket.on("call-user", ({ to, from, name, isVideo }) => {
        const user = getUser(to);
        if (user) {
          io.to(user.socketId).emit("call-user", {
            from,
            name,
            isVideo,
          });
        }
      });

      socket.on("answer-call", (data) => {
        const user = getUser(data.to);
        if (user) {
          io.to(user.socketId).emit("call-accepted");
        }
      });

      socket.on("end-call", (data) => {
        const user = getUser(data.to);
        if (user) {
          io.to(user.socketId).emit("call-ended");
        }
      });

      socket.on("reject-call", (data) => {
        const user = getUser(data.to);
        if (user) {
          io.to(user.socketId).emit("call-rejected");
        }
      });

      socket.on("send-msg", (data) => {
        if (data.to.startsWith("gr")) {
          socket
            .to(data.to)
            .emit("receive-msg", data.from + "," + data.message);
        } else {
          const sendUserSocket = getUser(data.to);
          if (sendUserSocket) {
            socket
              .to(sendUserSocket.socketId)
              .emit("receive-msg", data.from + "," + data.message);
          }
        }
      });

      socket.on("join-group", (data) => {
        socket.join("gr" + data.groupId);
      });

      socket.on("leave-group", (data) => {
        socket.leave("gr" + data.groupId);
      });

      socket.on("disconnect", () => {
        removeUser(socket.id);
        socket.emit("users-list", users);
      });
    });
  })
  .catch((err) => {
    console.log("Unable to start server: " + err);
  });
