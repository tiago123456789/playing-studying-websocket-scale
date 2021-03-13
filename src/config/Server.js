require("dotenv").config();
const express = require('express')
const morgan = require('morgan')
const http = require('http')
const socketIO = require('socket.io');
const routesApp = require("../route/index");
const app = express();
const topic = require("../pubSub/Topic");
const game = require("../Game");

const server = http.Server(app);
const io = socketIO(server);

app.use(morgan('dev')) 
app.set("view engine", "ejs");

app.use((request, response, next) => {
  app.locals.urlWebsocket = process.env.URL_WEBSOCKET;
  next();
})

routesApp(app); 

io.on('connection', game(io));

topic
  .subscribe("move", (message) => io.to(message.room).emit("move", message.data));
topic
  .subscribe("start-game", (message) => io.to(message.room).emit("start-game", message.data));

module.exports = server;