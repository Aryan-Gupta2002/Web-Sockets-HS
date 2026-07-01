import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const[messages,setMessage]=useState(["Hi there,welcome to this chat"]);
  useEffect(()=>{
    const ws = new WebSocket("ws: //localhost:8080");
    ws.onmessage =(event) =>{
      setMessage(m => [...m,event.data]);
    }
  },[])
  }
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
        <div className="h-[95vh] bg-grey-200"></div>
        <div>
          <input
            className="border-2 p-2 mx-5 my-2 rounded-md"
            type="text"
            placeholder="Enter Your message"
          ></input>
          <button>Send</button>
        </div>
      </div>
    </>
  );
}

export default App;
