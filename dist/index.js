"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
//Event Handler
wss.on("connection", function (socket) {
    console.log("Client connected");
    socket.send("Hello");
});
//# sourceMappingURL=index.js.map