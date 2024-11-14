import React, { }  from 'react';
import { useEffect } from 'react';
import { useState } from "react";
import { ConnectionState } from './ConnectionState';
import { ConnectionManager } from './ConnectionManager';
import { Events } from "./Events";
import { socket } from '../socket.js';
import {MyForm} from "./MyForm.js";
// import {ShowIds} from "./ShowIds.js";

// export var impID = ""
// const handleClick = (id) => {
  
//     // Listen for the 'connect' event
//     socket.on("connect", () => {
//       console.log("Hello, connected to server from chat!");
//     });

//     // Listen for 'private' messages from the server
//     socket.emit("getID", { text: impID });
//     console.log("Clicked ID:", id);
  
//     // Clean up listeners on unmount
//     return () => {
//       socket.off("connect");
//       socket.off("private");
//     };


// };


export default function Profile() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  // const [displayIds, setdisplayIds] = useState([]);
  useEffect(() => {
  //   socket.on('displayUserIds', (ids) => { //gets data from server to display ids
  //     setdisplayIds(ids)
  // });

  
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);
  
          return (
      
            <div>
                    
          {/* <ul>
        {displayIds.map((id, index) => (
          <button text={id} key={index} data-id={id} onClick={setID(id)}>{id}</button>
        ))}
      </ul> */}

            <ConnectionState isConnected={ isConnected } />
            <Events events={ fooEvents } />
            <ConnectionManager />
            <MyForm />
            </div>
          )
    
      
}


