import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//Event Handler

wss.on("connection", function (socket) {
  console.log("Client connected");
  setInterval(() => {
    socket.send("Current price: " + Math.random());
  }, 500);
});
