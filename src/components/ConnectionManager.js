import React from 'react';
import { socket } from '../socket';
import { useState } from "react";


export function ConnectionManager() {
  //const [displayIds, setdisplayIds] = useState([]);
  function connect() {    
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

      socket.on("connect", () => {
        socket.emit("sendID", { text: socket.id }); //emit the socket.id to server
      });    
      /*
      socket.on('displayUserIds', (ids) => { //gets data from server to display ids
        setdisplayIds(ids)

    });
    */
  
    /*
    socket.on('private', function(msg) {
      console.log(msg);
  });
  */

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

