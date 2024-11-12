import React, { useState } from 'react';
import { socket } from '../socket';
// import { getAuth } from "firebase/auth";

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('')

  function onSubmit(event) {

    event.preventDefault();
    setMessage(value)

    socket.emit("sendMessage", {text:message}); //emit the user's message to server
    
      

    socket.on('private', function(msg) {
        console.log(msg);
    });
  
    /* 
    socket.emit('chat message', value); //will send back message to sender only
    socket.on('chat message', (msg) => {
      setMessage(msg)
    })
    */
    


  }


  return (
    <div>
      
    <form onSubmit={ onSubmit }>
      <input onChange={ e => setValue(e.target.value) } />
      <button type="submit" disabled={ isLoading }>Submit</button>
    </form>
    <h1>{message}</h1>
    </div>
  );
}

