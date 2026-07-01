import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[] = [];
wss.on("connection", (socket) => {
  allSockets.push(socket);
  // One wss can have many sockets. Each socket for each client on the same wss server
  userCount += 1;
  console.log(`User ${userCount} connected`);
  // Below handles the message coming from the server particularly for this socket only
  socket.on("message", (msg) => {
    console.log(`Message received : ${msg.toString()}`);
    for (let i = 0; i < allSockets.length; i++) {
      const s = allSockets[i];
      if (!s) return;
      s.send(msg.toString() + "; from the server");
    }
  });
  socket.on("disconnect", () => {
    allSockets = allSockets.filter((x) => x != socket);
  });
});
