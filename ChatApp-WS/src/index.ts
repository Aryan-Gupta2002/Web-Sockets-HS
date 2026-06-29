import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
wss.on("connection", (socket) => {
  // One wss can have many sockets. Each socket for each client on the same wss server
  userCount += 1;
  console.log(`User ${userCount} connected`);
  // Below handles the message coming from the server particularly for this socket only
  socket.on("message", (msg) => {
    console.log(`Message received : ${msg.toString()}`);
    setTimeout(() => {
      socket.send(msg.toString() + "; from the server");
    }, 1000);
  });
});
