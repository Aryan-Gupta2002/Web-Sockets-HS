import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState();
  function sendMessage() {
    // Sending a message to server
    if (!socket) {
      return;
    }
    socket.send("ping");
  }
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    // Receiving a message from server
    ws.onmessage = (ev) => {
      alert(ev.data);
    };
  }, []);

  return (
    <>
      <div>
        <input type="text" placeholder="Message...."></input>
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
}

export default App;
