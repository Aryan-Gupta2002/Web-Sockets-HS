import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessage] = useState(["Hi there", "Welcome to this chat"]);
  let wsRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;
    ws.onmessage = (event) => {
      setMessage((m) => [...m, event.data]);
    };
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "Room 1",
          },
        }),
      );
    };
  }, []);
  return (
    <>
      <div className="h-screen flex flex-col h-screen justify-between">
        {/* <div>
          <input
            className="border-2 p-2 mx-5 my-2 rounded-md "
            type="text"
            placeholder="Enter room ID"
          ></input>
          <button>Join</button>
        </div> */}
        <div className="h-[90vh] bg-gray-400">
          {messages.map((message) => (
            <div className="m-8">
              <span className="bg-white text-black rounded-2xl p-2">
                {message}
              </span>
            </div>
          ))}
        </div>
        <div>
          <input
            id="message"
            className="border-2 p-2 mx-5 mb-5 my-2 rounded-md w-[80vw] "
            type="text"
            placeholder="Enter Your message"
          ></input>
          <button
            className="bg-blue-200 p-2 rounded-xl"
            onClick={() => {
              const msg = document.getElementById("message")?.value;
              wsRef.current.send(
                JSON.stringify({
                  type: "chat",
                  payload: {
                    message: msg,
                  },
                }),
              );
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
