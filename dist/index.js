"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
console.log("WebSocket server running on ws://localhost:8080");
//Event Handler
wss.on("connection", function (socket) {
    console.log("Client connected");
    setInterval(() => {
        socket.send("Current price: " + Math.random());
    }, 500);
    socket.on("message", (e) => {
        console.log(e.toString());
    });
});
//# sourceMappingURL=index.js.map