import React, { useState, useEffect } from 'react';
import { socket } from '../socket';

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [displayIds, setdisplayIds] = useState([]);
  const [idValue, setidValue] = useState('');
  useEffect(() => {
    // Set up the displayUserIds listener
    socket.on('displayUserIds', (ids) => {
      setdisplayIds(ids);
    });
  
    // Set up the private message listener
    socket.on('private', (msg) => {
      console.log("Private message received:", msg); // This should display the private message
    });
  
    // Cleanup listeners when the component unmounts
    return () => {
      socket.off('displayUserIds');
      socket.off('private');
    };
  }, []);
  
  function onSubmit(event) {
    event.preventDefault();
    setMessage(value); // Update the message state with the current value
    socket.emit("getID", { text: idValue });
    socket.emit("sendMessage", { text: value }); // Send the current value to the server
  }

  return (
    <div>
      <ul>
        {displayIds.map((id, index) => (
          <button key={index} data-id={id} onClick={() => setidValue(id)}>
            {id}
          </button>
        ))}
      </ul>

      <form onSubmit={onSubmit}>
        <input onChange={(e) => setValue(e.target.value)} />
        <button type="submit" disabled={isLoading}>Submit</button>
      </form>
      <h1>{message}</h1>
    </div>
  );
}
