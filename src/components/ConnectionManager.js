import React from 'react';
import { socket } from '../socket';
import { useState } from "react";
import { useEffect } from 'react';
import { auth } from "./firebase";


export function ConnectionManager() {
  const user = auth.currentUser;

  // const [displayIds, setdisplayIds] = useState([]);
  function connect() {  
    socket.connect();  
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
      socket.off("connect").on("connect", () => { // Removes previous listeners
        console.log("Connected:", socket.id);
        socket.emit("sendID", { text: socket.id });
        socket.emit("sendEmailToDisplay", {text: socket.userData.email})
    });
      }

  function disconnect() {
    console.log(socket.id)
    socket.emit("sendIDToDelete", { text: socket.id }); //emit the socket.id to server
    
  }

  return (
    <>
    {/* <p>{displayIds}</p> */}
      <button onClick={ connect }>Connect</button>
      <button onClick={ disconnect }>Disconnect</button>
    </>
  );
}

