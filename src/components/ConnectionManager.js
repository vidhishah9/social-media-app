import React from 'react';
import { socket } from '../socket';
import { useState } from "react";
import { useEffect } from 'react';
import { auth } from "./firebase";


export function ConnectionManager() {
  const user = auth.currentUser;

  // const [displayIds, setdisplayIds] = useState([]);
  function connect() {    
    
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
      socket.on("connect", () => {
        socket.emit("sendID", { text: socket.id }); //emit the socket.id to server
        // socket.emit("sendEmail", { text: user.email }); //emit the email to server

      });  
    socket.connect();

      
  
   
    
    
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
    {/* <p>{displayIds}</p> */}
      <button onClick={ connect }>Connect</button>
      <button onClick={ disconnect }>Disconnect</button>
    </>
  );
}

