import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

// Join message Schema
// {
//    "type": "join",
//    "payload": {
//      "roomId": "123"
//    }
// }
// Chat message Schema
// {
// 	"type": "chat",
// 	"payload": {
// 		"message: "hi there"
// 	}
// }

wss.on("connection", (socket) => {
  socket.on("message", (msg) => {
    // @ts-ignore
    const parsedMsg = JSON.parse(msg as unknown as string);
    if (parsedMsg.type == "join") {
      allSockets.push({
        socket,
        room: parsedMsg.payload.roomId,
      });
    }
    if (parsedMsg.type == "chat") {
      let currentSocketRoom = null;
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i]?.socket == socket) {
          currentSocketRoom = allSockets[i]?.room;
        }
      }
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i]?.room == currentSocketRoom) {
          allSockets[i]?.socket.send(parsedMsg.payload.message);
        }
      }
    }
  });
});