import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setlatestMessage] = useState<string | null>(null);
  const [message, setmessage] = useState< String | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setlatestMessage(message.data)
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <>
      hi there i do nothing just coding and staff
      
      <input type="text" placeholder='' onChange={(e)=> {
        setmessage(e.target.value)
         
      }} />

      <button className='' onClick={()=> {
        socket?.send(message)
      }}>send</button>
      {latestMessage}
    </>
  )
}

export default App