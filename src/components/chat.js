import React, { }  from 'react';
import { useEffect } from 'react';
import { useState } from "react";
import { ConnectionState } from './ConnectionState';
import { ConnectionManager } from './ConnectionManager';
import { Events } from "./Events";
import { socket } from '../socket.js';
import {MyForm} from "./MyForm.js";



export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  useEffect(() => {
 

  
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
            {/* <ConnectionState isConnected={ isConnected } /> */}
            <Events events={ fooEvents } />
            <ConnectionManager />
            <MyForm />
            </div>
          )
    
      
}


