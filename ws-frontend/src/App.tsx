import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();
  function sendMessage() {
    // Sending a message to server
    if (!socket) {
      return;
    }
    const msg = inputRef.current.value;
    socket.send(msg);
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
        <input ref={inputRef} type="text" placeholder="Message...."></input>
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
}

export default App;
